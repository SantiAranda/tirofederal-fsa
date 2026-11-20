import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import socios from './socios'
import clu from './clu'
import membresias from './membresias'
import instructores from './instructores'
import insumos from './insumos'
import pagos from './pagos'
import eventos from './eventos'
import noticias from './noticias'
import reportes from './reportes'
import configuracion from './configuracion'
/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
* @see Http/Controllers/Admin/DashboardController.php:19
* @route '/admin/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
* @see Http/Controllers/Admin/DashboardController.php:19
* @route '/admin/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
* @see Http/Controllers/Admin/DashboardController.php:19
* @route '/admin/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
* @see Http/Controllers/Admin/DashboardController.php:19
* @route '/admin/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
* @see Http/Controllers/Admin/DashboardController.php:19
* @route '/admin/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
* @see Http/Controllers/Admin/DashboardController.php:19
* @route '/admin/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
* @see Http/Controllers/Admin/DashboardController.php:19
* @route '/admin/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

/**
* @see \App\Http\Controllers\Admin\CalendarioController::calendario
* @see Http/Controllers/Admin/CalendarioController.php:19
* @route '/admin/calendario'
*/
export const calendario = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendario.url(options),
    method: 'get',
})

calendario.definition = {
    methods: ["get","head"],
    url: '/admin/calendario',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CalendarioController::calendario
* @see Http/Controllers/Admin/CalendarioController.php:19
* @route '/admin/calendario'
*/
calendario.url = (options?: RouteQueryOptions) => {
    return calendario.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CalendarioController::calendario
* @see Http/Controllers/Admin/CalendarioController.php:19
* @route '/admin/calendario'
*/
calendario.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendario.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CalendarioController::calendario
* @see Http/Controllers/Admin/CalendarioController.php:19
* @route '/admin/calendario'
*/
calendario.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calendario.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CalendarioController::calendario
* @see Http/Controllers/Admin/CalendarioController.php:19
* @route '/admin/calendario'
*/
const calendarioForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calendario.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CalendarioController::calendario
* @see Http/Controllers/Admin/CalendarioController.php:19
* @route '/admin/calendario'
*/
calendarioForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calendario.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CalendarioController::calendario
* @see Http/Controllers/Admin/CalendarioController.php:19
* @route '/admin/calendario'
*/
calendarioForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calendario.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

calendario.form = calendarioForm

const admin = {
    dashboard: Object.assign(dashboard, dashboard),
    socios: Object.assign(socios, socios),
    clu: Object.assign(clu, clu),
    membresias: Object.assign(membresias, membresias),
    instructores: Object.assign(instructores, instructores),
    insumos: Object.assign(insumos, insumos),
    pagos: Object.assign(pagos, pagos),
    eventos: Object.assign(eventos, eventos),
    noticias: Object.assign(noticias, noticias),
    reportes: Object.assign(reportes, reportes),
    calendario: Object.assign(calendario, calendario),
    configuracion: Object.assign(configuracion, configuracion),
}

export default admin