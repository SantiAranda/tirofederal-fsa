import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import eventosD8c6a8 from './eventos'
import noticias from './noticias'
/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:144
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
* @see Http/Controllers/PublicController.php:144
* @route '/eventos'
*/
eventos.url = (options?: RouteQueryOptions) => {
    return eventos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:144
* @route '/eventos'
*/
eventos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:144
* @route '/eventos'
*/
eventos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: eventos.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:144
* @route '/eventos'
*/
const eventosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: eventos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:144
* @route '/eventos'
*/
eventosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: eventos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:144
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

/**
* @see \App\Http\Controllers\PublicController::calendario
* @see Http/Controllers/PublicController.php:166
* @route '/calendario'
*/
export const calendario = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendario.url(options),
    method: 'get',
})

calendario.definition = {
    methods: ["get","head"],
    url: '/calendario',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::calendario
* @see Http/Controllers/PublicController.php:166
* @route '/calendario'
*/
calendario.url = (options?: RouteQueryOptions) => {
    return calendario.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::calendario
* @see Http/Controllers/PublicController.php:166
* @route '/calendario'
*/
calendario.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendario.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::calendario
* @see Http/Controllers/PublicController.php:166
* @route '/calendario'
*/
calendario.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calendario.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::calendario
* @see Http/Controllers/PublicController.php:166
* @route '/calendario'
*/
const calendarioForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calendario.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::calendario
* @see Http/Controllers/PublicController.php:166
* @route '/calendario'
*/
calendarioForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calendario.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::calendario
* @see Http/Controllers/PublicController.php:166
* @route '/calendario'
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

const publicMethod = {
    eventos: Object.assign(eventos, eventosD8c6a8),
    calendario: Object.assign(calendario, calendario),
    noticias: Object.assign(noticias, noticias),
}

export default publicMethod