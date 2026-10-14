<?php

namespace App\Http\Middleware;

use App\Enums\EstadoSocio;
use App\Enums\RolUsuario;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     * Conforme a SPECS.md 4.1: datos de sesion, rol activo, alertas CLU y flash messages.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        $userData = null;
        if ($user) {
            $rolValue = $user->rol instanceof RolUsuario ? $user->rol->value : (string) $user->rol;
            $socioProfile = $user->socioProfile;
            $estadoSocio = $socioProfile?->estado_habilitacion;
            $estadoSocioValue = $estadoSocio instanceof EstadoSocio ? $estadoSocio->value : ($estadoSocio ? (string) $estadoSocio : null);

            $userData = [
                'id' => $user->id,
                'nombre' => $user->nombre,
                'name' => $user->nombre ?? $user->name,
                'apellido' => $user->apellido,
                'nombre_completo' => trim(($user->nombre ?? $user->name) . ' ' . $user->apellido),
                'email' => $user->email,
                'username' => $user->username,
                'usuario' => $user->username,
                'rol' => $rolValue,
                'estado_socio' => $estadoSocioValue,
                'alerta_clu' => $socioProfile?->credencialLu?->obtenerAlertaVencimiento(),
                'avatar' => $user->avatar ?? null,
                'email_verified_at' => $user->email_verified_at?->toISOString(),
                'created_at' => $user->created_at?->toISOString(),
                'updated_at' => $user->updated_at?->toISOString(),
            ];
        }

        return array_merge(parent::share($request), [
            'name' => config('app.name'),
            'auth' => [
                'user' => $userData,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'csrf_token' => csrf_token(),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ]);
    }
}
