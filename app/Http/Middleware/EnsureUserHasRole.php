<?php

namespace App\Http\Middleware;

use App\Enums\RolUsuario;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user) {
            abort(401, 'No autenticado.');
        }

        $userRole = $user->rol instanceof RolUsuario ? $user->rol->value : (string) $user->rol;

        // Si se especifican roles permitidos, verificar pertenencia
        if (! empty($roles) && ! in_array($userRole, $roles, true)) {
            abort(403, 'Acceso denegado: rol no autorizado.');
        }

        return $next($request);
    }
}
