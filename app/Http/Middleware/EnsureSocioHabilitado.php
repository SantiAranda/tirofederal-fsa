<?php

namespace App\Http\Middleware;

use App\Enums\EstadoSocio;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureSocioHabilitado
{
    /**
     * Intercepta solicitudes de reserva de turnos para socios en mora (RF08, SPECS 5.1).
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->esSocio()) {
            $socioProfile = $user->socioProfile;

            if ($socioProfile && $socioProfile->estaEnMora()) {
                if ($request->expectsJson()) {
                    return response()->json([
                        'message' => 'Reserva bloqueada preventivamente: su cuenta societaria registra cuotas en mora.',
                        'redirect' => route('socio.pagos.index'),
                    ], 403);
                }

                return redirect()->route('socio.pagos.index')->with('error', 'Reserva bloqueada: posee deuda pendiente de cuotas sociales.');
            }
        }

        return $next($request);
    }
}
