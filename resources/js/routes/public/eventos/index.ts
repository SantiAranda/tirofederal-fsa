import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PublicController::show
* @see Http/Controllers/PublicController.php:131
* @route '/eventos/{evento}'
*/
export const show = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/eventos/{evento}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::show
* @see Http/Controllers/PublicController.php:131
* @route '/eventos/{evento}'
*/
show.url = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evento: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { evento: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            evento: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        evento: typeof args.evento === 'object'
        ? args.evento.id
        : args.evento,
    }

    return show.definition.url
            .replace('{evento}', parsedArgs.evento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::show
* @see Http/Controllers/PublicController.php:131
* @route '/eventos/{evento}'
*/
show.get = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::show
* @see Http/Controllers/PublicController.php:131
* @route '/eventos/{evento}'
*/
show.head = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::show
* @see Http/Controllers/PublicController.php:131
* @route '/eventos/{evento}'
*/
const showForm = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::show
* @see Http/Controllers/PublicController.php:131
* @route '/eventos/{evento}'
*/
showForm.get = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::show
* @see Http/Controllers/PublicController.php:131
* @route '/eventos/{evento}'
*/
showForm.head = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const eventos = {
    show: Object.assign(show, show),
}

export default eventos