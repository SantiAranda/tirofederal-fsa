import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Instructor\AgendaController::index
* @see Http/Controllers/Instructor/AgendaController.php:23
* @route '/instructor/agenda'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/instructor/agenda',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Instructor\AgendaController::index
* @see Http/Controllers/Instructor/AgendaController.php:23
* @route '/instructor/agenda'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Instructor\AgendaController::index
* @see Http/Controllers/Instructor/AgendaController.php:23
* @route '/instructor/agenda'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Instructor\AgendaController::index
* @see Http/Controllers/Instructor/AgendaController.php:23
* @route '/instructor/agenda'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Instructor\AgendaController::index
* @see Http/Controllers/Instructor/AgendaController.php:23
* @route '/instructor/agenda'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Instructor\AgendaController::index
* @see Http/Controllers/Instructor/AgendaController.php:23
* @route '/instructor/agenda'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Instructor\AgendaController::index
* @see Http/Controllers/Instructor/AgendaController.php:23
* @route '/instructor/agenda'
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
* @see \App\Http\Controllers\Instructor\AgendaController::confirmar
* @see Http/Controllers/Instructor/AgendaController.php:46
* @route '/instructor/turnos/{turno}/asistencia'
*/
export const confirmar = (args: { turno: string | number | { id: string | number } } | [turno: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: confirmar.url(args, options),
    method: 'patch',
})

confirmar.definition = {
    methods: ["patch"],
    url: '/instructor/turnos/{turno}/asistencia',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Instructor\AgendaController::confirmar
* @see Http/Controllers/Instructor/AgendaController.php:46
* @route '/instructor/turnos/{turno}/asistencia'
*/
confirmar.url = (args: { turno: string | number | { id: string | number } } | [turno: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return confirmar.definition.url
            .replace('{turno}', parsedArgs.turno.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Instructor\AgendaController::confirmar
* @see Http/Controllers/Instructor/AgendaController.php:46
* @route '/instructor/turnos/{turno}/asistencia'
*/
confirmar.patch = (args: { turno: string | number | { id: string | number } } | [turno: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: confirmar.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Instructor\AgendaController::confirmar
* @see Http/Controllers/Instructor/AgendaController.php:46
* @route '/instructor/turnos/{turno}/asistencia'
*/
const confirmarForm = (args: { turno: string | number | { id: string | number } } | [turno: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: confirmar.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Instructor\AgendaController::confirmar
* @see Http/Controllers/Instructor/AgendaController.php:46
* @route '/instructor/turnos/{turno}/asistencia'
*/
confirmarForm.patch = (args: { turno: string | number | { id: string | number } } | [turno: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: confirmar.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

confirmar.form = confirmarForm

const AgendaController = { index, confirmar }

export default AgendaController