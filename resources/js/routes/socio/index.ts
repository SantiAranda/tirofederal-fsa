import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import perfil from './perfil'
import turnos from './turnos'
import pagos from './pagos'
import eventos from './eventos'
import evaluaciones from './evaluaciones'
import clu from './clu'
/**
* @see \App\Http\Controllers\Socio\DashboardController::dashboard
* @see Http/Controllers/Socio/DashboardController.php:15
* @route '/panel'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/panel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Socio\DashboardController::dashboard
* @see Http/Controllers/Socio/DashboardController.php:15
* @route '/panel'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Socio\DashboardController::dashboard
* @see Http/Controllers/Socio/DashboardController.php:15
* @route '/panel'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\DashboardController::dashboard
* @see Http/Controllers/Socio/DashboardController.php:15
* @route '/panel'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Socio\DashboardController::dashboard
* @see Http/Controllers/Socio/DashboardController.php:15
* @route '/panel'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\DashboardController::dashboard
* @see Http/Controllers/Socio/DashboardController.php:15
* @route '/panel'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\DashboardController::dashboard
* @see Http/Controllers/Socio/DashboardController.php:15
* @route '/panel'
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

const socio = {
    dashboard: Object.assign(dashboard, dashboard),
    perfil: Object.assign(perfil, perfil),
    turnos: Object.assign(turnos, turnos),
    pagos: Object.assign(pagos, pagos),
    eventos: Object.assign(eventos, eventos),
    evaluaciones: Object.assign(evaluaciones, evaluaciones),
    clu: Object.assign(clu, clu),
}

export default socio