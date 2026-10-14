<?php

namespace App\Services;

use App\Enums\EstadoCLU;
use App\Enums\EstadoSocio;
use App\Models\CredencialLu;
use App\Models\SocioProfile;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class CluService
{
    /**
     * Directorio privado para almacenamiento de legajos y documentación ANMaC (RF03, RNF01, SPECS 5.4).
     */
    public const DISK_PRIVATE_PATH = 'private/legajos';

    /**
     * Almacena un archivo de documentación en el disco privado.
     */
    public function guardarDocumento(UploadedFile $file, string $campo, int $socioProfileId): string
    {
        $extension = $file->getClientOriginalExtension();
        $filename = "{$campo}_" . uniqid() . '.' . $extension;
        $folder = self::DISK_PRIVATE_PATH . "/{$socioProfileId}";

        return $file->storeAs($folder, $filename, 'local');
    }

    /**
     * Registra o actualiza la documentación de Legítimo Usuario de un socio (RF03, RF10).
     *
     * @param  array{
     *     numero_clu?: string|null,
     *     fecha_emision?: string|null,
     *     fecha_vencimiento?: string|null,
     *     apto_psicofisico?: bool,
     *     certificado_idoneidad?: bool,
     * }  $datos
     * @param  array<string, UploadedFile>  $archivos
     */
    public function registrarOActualizar(SocioProfile $socio, array $datos, array $archivos = []): CredencialLu
    {
        $credencial = $socio->credencialLu ?? new CredencialLu(['socio_profile_id' => $socio->id]);

        $camposArchivo = [
            'foto_dni_frente' => 'foto_dni_frente_path',
            'foto_dni_dorso' => 'foto_dni_dorso_path',
            'foto_clu_frente' => 'foto_clu_frente_path',
            'foto_clu_dorso' => 'foto_clu_dorso_path',
        ];

        foreach ($camposArchivo as $inputKey => $dbCol) {
            if (isset($archivos[$inputKey]) && $archivos[$inputKey] instanceof UploadedFile) {
                // Si existía un archivo previo, removerlo del storage privado
                if ($credencial->$dbCol && Storage::disk('local')->exists($credencial->$dbCol)) {
                    Storage::disk('local')->delete($credencial->$dbCol);
                }
                $credencial->$dbCol = $this->guardarDocumento($archivos[$inputKey], $inputKey, $socio->id);
            }
        }

        if (array_key_exists('numero_clu', $datos)) {
            $credencial->numero_clu = $datos['numero_clu'];
        }
        if (array_key_exists('fecha_emision', $datos)) {
            $credencial->fecha_emision = $datos['fecha_emision'];
        }
        if (array_key_exists('fecha_vencimiento', $datos)) {
            $credencial->fecha_vencimiento = $datos['fecha_vencimiento'];
        }
        if (array_key_exists('apto_psicofisico', $datos)) {
            $credencial->apto_psicofisico = (bool) $datos['apto_psicofisico'];
        }
        if (array_key_exists('certificado_idoneidad', $datos)) {
            $credencial->certificado_idoneidad = (bool) $datos['certificado_idoneidad'];
        }

        // Al subir nueva documentación o actualizarla pasa a estado pendiente de auditoría
        $credencial->estado_validacion = EstadoCLU::PENDIENTE;
        $credencial->save();

        return $credencial;
    }

    /**
     * Fiscaliza y aprueba o rechaza la documentación por parte de la Presidencia (RF03, RF10, SPECS 6.4).
     *
     * @throws ValidationException
     */
    public function validarDocumentacion(CredencialLu $credencial, string $nuevoEstado, ?string $observaciones = null): CredencialLu
    {
        $estado = EstadoCLU::tryFrom($nuevoEstado);
        if (! $estado || ! in_array($estado, [EstadoCLU::APROBADO, EstadoCLU::RECHAZADO, EstadoCLU::VENCIDO, EstadoCLU::SIN_CLU], true)) {
            throw ValidationException::withMessages([
                'estado' => 'El estado de validación especificado no es válido.',
            ]);
        }

        $credencial->estado_validacion = $estado;
        $credencial->observaciones_auditoria = $observaciones;
        $credencial->save();

        // Al ser aprobado, se habilita la cuenta del socio y del usuario (RF03, RF08)
        $socio = $credencial->socioProfile;
        if ($socio) {
            if ($estado === EstadoCLU::APROBADO) {
                if ($socio->estado_habilitacion === EstadoSocio::PENDIENTE_VALIDACION) {
                    $socio->estado_habilitacion = EstadoSocio::ACTIVO;
                    $socio->save();
                }

                $user = $socio->user;
                if ($user && ! $user->activo) {
                    $user->activo = true;
                    $user->save();
                }
            } elseif ($estado === EstadoCLU::RECHAZADO) {
                $socio->estado_habilitacion = EstadoSocio::INACTIVO;
                $socio->save();
            }
        }

        return $credencial;
    }

    /**
     * Retorna la ruta física absoluta de un archivo privado para su entrega segura.
     */
    public function obtenerRutaArchivoPrivado(CredencialLu $credencial, string $tipoArchivo): ?string
    {
        $columna = match ($tipoArchivo) {
            'dni_frente' => 'foto_dni_frente_path',
            'dni_dorso' => 'foto_dni_dorso_path',
            'clu_frente' => 'foto_clu_frente_path',
            'clu_dorso' => 'foto_clu_dorso_path',
            default => null,
        };

        if (! $columna || empty($credencial->$columna)) {
            return null;
        }

        $path = $credencial->$columna;
        if (! Storage::disk('local')->exists($path)) {
            return null;
        }

        return Storage::disk('local')->path($path);
    }
}
