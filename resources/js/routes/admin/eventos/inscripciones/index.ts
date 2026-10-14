import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\EventoController::asistencia
* @see Http/Controllers/Admin/EventoController.php:136
* @route '/admin/eventos/inscripciones/{inscripcion}/asistencia'
*/
export const asistencia = (args: { inscripcion: string | number | { id: string | number } } | [inscripcion: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: asistencia.url(args, options),
    method: 'patch',
})

asistencia.definition = {
    methods: ["patch"],
    url: '/admin/eventos/inscripciones/{inscripcion}/asistencia',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\EventoController::asistencia
* @see Http/Controllers/Admin/EventoController.php:136
* @route '/admin/eventos/inscripciones/{inscripcion}/asistencia'
*/
asistencia.url = (args: { inscripcion: string | number | { id: string | number } } | [inscripcion: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { inscripcion: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { inscripcion: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            inscripcion: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        inscripcion: typeof args.inscripcion === 'object'
        ? args.inscripcion.id
        : args.inscripcion,
    }

    return asistencia.definition.url
            .replace('{inscripcion}', parsedArgs.inscripcion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventoController::asistencia
* @see Http/Controllers/Admin/EventoController.php:136
* @route '/admin/eventos/inscripciones/{inscripcion}/asistencia'
*/
asistencia.patch = (args: { inscripcion: string | number | { id: string | number } } | [inscripcion: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: asistencia.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::asistencia
* @see Http/Controllers/Admin/EventoController.php:136
* @route '/admin/eventos/inscripciones/{inscripcion}/asistencia'
*/
const asistenciaForm = (args: { inscripcion: string | number | { id: string | number } } | [inscripcion: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: asistencia.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::asistencia
* @see Http/Controllers/Admin/EventoController.php:136
* @route '/admin/eventos/inscripciones/{inscripcion}/asistencia'
*/
asistenciaForm.patch = (args: { inscripcion: string | number | { id: string | number } } | [inscripcion: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: asistencia.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

asistencia.form = asistenciaForm

const inscripciones = {
    asistencia: Object.assign(asistencia, asistencia),
}

export default inscripciones