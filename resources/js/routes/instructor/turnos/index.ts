import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Instructor\AgendaController::asistencia
* @see Http/Controllers/Instructor/AgendaController.php:46
* @route '/instructor/turnos/{turno}/asistencia'
*/
export const asistencia = (args: { turno: string | number | { id: string | number } } | [turno: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: asistencia.url(args, options),
    method: 'patch',
})

asistencia.definition = {
    methods: ["patch"],
    url: '/instructor/turnos/{turno}/asistencia',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Instructor\AgendaController::asistencia
* @see Http/Controllers/Instructor/AgendaController.php:46
* @route '/instructor/turnos/{turno}/asistencia'
*/
asistencia.url = (args: { turno: string | number | { id: string | number } } | [turno: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return asistencia.definition.url
            .replace('{turno}', parsedArgs.turno.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Instructor\AgendaController::asistencia
* @see Http/Controllers/Instructor/AgendaController.php:46
* @route '/instructor/turnos/{turno}/asistencia'
*/
asistencia.patch = (args: { turno: string | number | { id: string | number } } | [turno: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: asistencia.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Instructor\AgendaController::asistencia
* @see Http/Controllers/Instructor/AgendaController.php:46
* @route '/instructor/turnos/{turno}/asistencia'
*/
const asistenciaForm = (args: { turno: string | number | { id: string | number } } | [turno: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: asistencia.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Instructor\AgendaController::asistencia
* @see Http/Controllers/Instructor/AgendaController.php:46
* @route '/instructor/turnos/{turno}/asistencia'
*/
asistenciaForm.patch = (args: { turno: string | number | { id: string | number } } | [turno: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: asistencia.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

asistencia.form = asistenciaForm

const turnos = {
    asistencia: Object.assign(asistencia, asistencia),
}

export default turnos