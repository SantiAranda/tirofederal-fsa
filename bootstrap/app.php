<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'role' => \App\Http\Middleware\EnsureUserHasRole::class,
            'socio.habilitado' => \App\Http\Middleware\EnsureSocioHabilitado::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->report(function (\Illuminate\Session\TokenMismatchException $e) {
            $request = request();
            \Illuminate\Support\Facades\Log::warning('CSRF TokenMismatchException DETECTADO', [
                'url' => $request?->fullUrl(),
                'method' => $request?->method(),
                'origin' => $request?->header('Origin'),
                'referer' => $request?->header('Referer'),
                'sec_fetch_site' => $request?->header('Sec-Fetch-Site'),
                'session_id' => $request?->session()?->getId(),
                'session_token' => $request?->session()?->token(),
                'input_token' => $request?->input('_token'),
                'header_csrf' => $request?->header('X-CSRF-TOKEN'),
                'header_xsrf' => $request?->header('X-XSRF-TOKEN') ? substr($request->header('X-XSRF-TOKEN'), 0, 30) . '...' : null,
                'cookies_presentes' => $request ? array_keys($request->cookies->all()) : [],
            ]);
        });

        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
    })->create();
