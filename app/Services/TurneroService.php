<?php

namespace App\Services;

use App\Enums\EstadoSocio;
use App\Models\InstructorProfile;
use App\Models\LineaDeTiro;
use App\Models\SocioProfile;
use App\Models\Turno;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class TurneroService
{
    /**
     * Arancel base para práctica individual por un día / asistencia obligatoria con instructor (RF16).
     */
    public const ARANCEL_PRACTICA_DIARIA = 15000.00;

    /**
     * Registra una nueva reserva de pedana cumpliendo las reglas de negocio críticas (RF03, RF08, RF10, RF13, RF15, RF16, RF18).
     *
     * @param  array{
     *     socio_profile_id: int,
     *     linea_de_tiro_id: int,
     *     instructor_profile_id?: int|null,
     *     fecha: string,
     *     hora_inicio: string,
     *     hora_fin: string,
     *     es_practica_individual_dia?: bool,
     *     observaciones?: string|null
     * }  $data
     * @throws ValidationException
     */
    public function reservarTurno(array $data): Turno
    {
        return DB::transaction(function () use ($data) {
            $socio = SocioProfile::with(['credencialLu', 'membresia'])->findOrFail($data['socio_profile_id']);
            $linea = LineaDeTiro::findOrFail($data['linea_de_tiro_id']);

            // 1. Bloqueo Preventivo por Mora (RF08, SPECS 5.1)
            if ($socio->estaEnMora()) {
                throw ValidationException::withMessages([
                    'socio' => 'El socio se encuentra en mora. Debe regularizar su cuota societaria antes de reservar.',
                ]);
            }

            // 2. Fiscalización de CLU y Requisito Obligatorio de Instructor (RF03, RF10, RF16, RF18, SPECS 5.2)
            $credencial = $socio->credencialLu;
            $tieneCluVigente = $credencial !== null && $credencial->estaVigente();
            $poseeArmaPropia = (bool) $socio->posee_arma_propia;
            $esTiradorDiario = (bool) ($data['es_practica_individual_dia'] ?? $socio->es_tirador_diario);

            $requiereInstructor = ! $tieneCluVigente || ! $poseeArmaPropia || $esTiradorDiario;

            $instructorId = $data['instructor_profile_id'] ?? null;

            if ($requiereInstructor) {
                if (empty($instructorId)) {
                    throw ValidationException::withMessages([
                        'instructor_profile_id' => 'Debe seleccionar obligatoriamente un instructor habilitado: el tirador no posee CLU vigente aprobada ante ANMaC, carece de arma propia o asiste a práctica diaria.',
                    ]);
                }

                // Verificar que el instructor exista y esté disponible
                $instructor = InstructorProfile::findOrFail($instructorId);
                if (! $instructor->disponible) {
                    throw ValidationException::withMessages([
                        'instructor_profile_id' => 'El instructor seleccionado no se encuentra disponible actualmente.',
                    ]);
                }
            }

            $fecha = $data['fecha'];
            $horaInicio = $data['hora_inicio'];
            $horaFin = $data['hora_fin'] ?? \Carbon\Carbon::createFromFormat('H:i', $horaInicio)->addMinutes(45)->format('H:i');

            // 3. Control de Concurrencia en Pedana (RF13, RF15, SPECS 5.3)
            $turnoSolapado = Turno::where('linea_de_tiro_id', $linea->id)
                ->whereDate('fecha', $fecha)
                ->whereIn('estado', ['reservado', 'confirmado'])
                ->where(function ($query) use ($horaInicio, $horaFin) {
                    $query->where(function ($q) use ($horaInicio, $horaFin) {
                        $q->where('hora_inicio', '<', $horaFin)
                          ->where('hora_fin', '>', $horaInicio);
                    });
                })
                ->lockForUpdate()
                ->first();

            if ($turnoSolapado) {
                throw ValidationException::withMessages([
                    'linea_de_tiro_id' => 'La línea de tiro seleccionada ya se encuentra ocupada en ese bloque horario.',
                ]);
            }

            // 4. Control de Concurrencia del Instructor
            if ($instructorId) {
                $instructorOcupado = Turno::where('instructor_profile_id', $instructorId)
                    ->whereDate('fecha', $fecha)
                    ->whereIn('estado', ['reservado', 'confirmado'])
                    ->where(function ($query) use ($horaInicio, $horaFin) {
                        $query->where('hora_inicio', '<', $horaFin)
                              ->where('hora_fin', '>', $horaInicio);
                    })
                    ->lockForUpdate()
                    ->first();

                if ($instructorOcupado) {
                    throw ValidationException::withMessages([
                        'instructor_profile_id' => 'El instructor seleccionado ya tiene asignada otra práctica en ese mismo horario.',
                    ]);
                }
            }

            // 5. Cálculo del arancel (RF14, RF16, SPECS 3.7)
            // Para socios activos con CLU vigente y arma propia el arancel de pedana es $0.00.
            // Para tiradores diarios o sin CLU/arma, aplica el arancel fijado.
            $montoArancel = 0.00;
            if ($esTiradorDiario || ! $tieneCluVigente || ! $poseeArmaPropia) {
                $montoArancel = self::ARANCEL_PRACTICA_DIARIA;
            }

            return Turno::create([
                'socio_profile_id' => $socio->id,
                'linea_de_tiro_id' => $linea->id,
                'instructor_profile_id' => $instructorId,
                'fecha' => $fecha,
                'hora_inicio' => $horaInicio,
                'hora_fin' => $horaFin,
                'es_practica_individual_dia' => $esTiradorDiario,
                'monto_arancel' => $montoArancel,
                'estado' => 'reservado',
                'observaciones' => $data['observaciones'] ?? null,
            ]);
        });
    }

    /**
     * Cancela un turno reservado o confirmado liberando el cupo de la pedana (RF14).
     */
    public function cancelarTurno(Turno $turno): Turno
    {
        if (! in_array($turno->estado, ['reservado', 'confirmado'], true)) {
            throw ValidationException::withMessages([
                'turno' => 'El turno no puede cancelarse en su estado actual.',
            ]);
        }

        $turno->update([
            'estado' => 'cancelado',
        ]);

        return $turno;
    }

    /**
     * Confirma la asistencia a un turno y lo habilita para posterior evaluación (RF19, RF20).
     */
    public function confirmarAsistencia(Turno $turno): Turno
    {
        $turno->update([
            'estado' => 'asistido',
        ]);

        return $turno;
    }

    /**
     * Consulta la disponibilidad de todas las líneas e instructores para una fecha determinada (RNF06, RNF07).
     *
     * @return array{lineas: Collection, instructores: Collection, turnos_ocupados: Collection}
     */
    public function consultarDisponibilidad(string $fecha): array
    {
        $lineas = LineaDeTiro::where('disponible', true)->orderBy('numero_linea')->get();
        $instructores = InstructorProfile::with('user')->where('disponible', true)->get();

        $turnosOcupados = Turno::whereDate('fecha', $fecha)
            ->whereIn('estado', ['reservado', 'confirmado'])
            ->get(['id', 'linea_de_tiro_id', 'instructor_profile_id', 'hora_inicio', 'hora_fin', 'estado']);

        return [
            'lineas' => $lineas,
            'instructores' => $instructores,
            'turnos_ocupados' => $turnosOcupados,
        ];
    }
}
