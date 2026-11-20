<?php

namespace App\Http\Middleware;

use App\Enums\EstadoSocio;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureCuentaActiva
{
    /**
     * Impide que una cuenta todavía no validada por administración acceda a
     * cualquier sección interna (panel, perfil, pagos, turnos, ajustes...).
     * Solo puede ver la pantalla de "solicitud en trámite" y cerrar sesión.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $this->estaSinVerificar($user)) {
            if ($request->expectsJson() && ! $request->header('X-Inertia')) {
                return response()->json([
                    'message' => 'Tu cuenta todavía está pendiente de validación.',
                    'redirect' => route('solicitud.tramite'),
                ], 403);
            }

            return redirect()->route('solicitud.tramite');
        }

        return $next($request);
    }

    /**
     * Una cuenta queda verificada cuando administración aprueba su CLU
     * (CluService pone `activo = true`). Excepción: un socio en mora puede
     * tener `activo = false` (lo setea Admin\SocioController), pero ya fue
     * verificado y necesita entrar para regularizar sus pagos.
     */
    private function estaSinVerificar(User $user): bool
    {
        if ($user->activo) {
            return false;
        }

        return $user->socioProfile?->estado_habilitacion !== EstadoSocio::EN_MORA;
    }
}
