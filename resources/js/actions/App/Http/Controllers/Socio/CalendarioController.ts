import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Socio\CalendarioController::index
* @see app/Http/Controllers/Socio/CalendarioController.php:17
* @route '/socio/calendario'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/socio/calendario',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Socio\CalendarioController::index
* @see app/Http/Controllers/Socio/CalendarioController.php:17
* @route '/socio/calendario'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Socio\CalendarioController::index
* @see app/Http/Controllers/Socio/CalendarioController.php:17
* @route '/socio/calendario'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\CalendarioController::index
* @see app/Http/Controllers/Socio/CalendarioController.php:17
* @route '/socio/calendario'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Socio\CalendarioController::index
* @see app/Http/Controllers/Socio/CalendarioController.php:17
* @route '/socio/calendario'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\CalendarioController::index
* @see app/Http/Controllers/Socio/CalendarioController.php:17
* @route '/socio/calendario'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\CalendarioController::index
* @see app/Http/Controllers/Socio/CalendarioController.php:17
* @route '/socio/calendario'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

const CalendarioController = { index }

export default CalendarioController