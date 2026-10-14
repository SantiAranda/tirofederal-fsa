import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Socio\TurnoController::index
* @see Http/Controllers/Socio/TurnoController.php:24
* @route '/turnos'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/turnos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Socio\TurnoController::index
* @see Http/Controllers/Socio/TurnoController.php:24
* @route '/turnos'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Socio\TurnoController::index
* @see Http/Controllers/Socio/TurnoController.php:24
* @route '/turnos'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\TurnoController::index
* @see Http/Controllers/Socio/TurnoController.php:24
* @route '/turnos'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Socio\TurnoController::index
* @see Http/Controllers/Socio/TurnoController.php:24
* @route '/turnos'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\TurnoController::index
* @see Http/Controllers/Socio/TurnoController.php:24
* @route '/turnos'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\TurnoController::index
* @see Http/Controllers/Socio/TurnoController.php:24
* @route '/turnos'
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

/**
* @see \App\Http\Controllers\Socio\TurnoController::store
* @see Http/Controllers/Socio/TurnoController.php:47
* @route '/turnos'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/turnos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Socio\TurnoController::store
* @see Http/Controllers/Socio/TurnoController.php:47
* @route '/turnos'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Socio\TurnoController::store
* @see Http/Controllers/Socio/TurnoController.php:47
* @route '/turnos'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Socio\TurnoController::store
* @see Http/Controllers/Socio/TurnoController.php:47
* @route '/turnos'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Socio\TurnoController::store
* @see Http/Controllers/Socio/TurnoController.php:47
* @route '/turnos'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Socio\TurnoController::cancel
* @see Http/Controllers/Socio/TurnoController.php:67
* @route '/turnos/{turno}/cancelar'
*/
export const cancel = (args: { turno: string | number | { id: string | number } } | [turno: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: cancel.url(args, options),
    method: 'patch',
})

cancel.definition = {
    methods: ["patch"],
    url: '/turnos/{turno}/cancelar',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Socio\TurnoController::cancel
* @see Http/Controllers/Socio/TurnoController.php:67
* @route '/turnos/{turno}/cancelar'
*/
cancel.url = (args: { turno: string | number | { id: string | number } } | [turno: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { turno: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { turno: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            turno: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        turno: typeof args.turno === 'object'
        ? args.turno.id
        : args.turno,
    }

    return cancel.definition.url
            .replace('{turno}', parsedArgs.turno.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Socio\TurnoController::cancel
* @see Http/Controllers/Socio/TurnoController.php:67
* @route '/turnos/{turno}/cancelar'
*/
cancel.patch = (args: { turno: string | number | { id: string | number } } | [turno: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: cancel.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Socio\TurnoController::cancel
* @see Http/Controllers/Socio/TurnoController.php:67
* @route '/turnos/{turno}/cancelar'
*/
const cancelForm = (args: { turno: string | number | { id: string | number } } | [turno: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Socio\TurnoController::cancel
* @see Http/Controllers/Socio/TurnoController.php:67
* @route '/turnos/{turno}/cancelar'
*/
cancelForm.patch = (args: { turno: string | number | { id: string | number } } | [turno: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

cancel.form = cancelForm

const TurnoController = { index, store, cancel }

export default TurnoController