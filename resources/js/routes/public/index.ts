import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
export const eventos = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventos.url(options),
    method: 'get',
})

eventos.definition = {
    methods: ["get","head"],
    url: '/eventos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
eventos.url = (options?: RouteQueryOptions) => {
    return eventos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
eventos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
eventos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: eventos.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
const eventosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: eventos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
eventosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: eventos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
eventosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: eventos.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

eventos.form = eventosForm

const publicMethod = {
    eventos: Object.assign(eventos, eventos),
}

export default publicMethod