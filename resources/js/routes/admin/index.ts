import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import socios from './socios'
import clu from './clu'
import membresias from './membresias'
import instructores from './instructores'
import insumos from './insumos'
import pagos from './pagos'
import eventos from './eventos'
import noticias from './noticias'
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
}

export default admin