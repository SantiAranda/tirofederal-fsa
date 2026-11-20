import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import agenda from './agenda'
import turnos from './turnos'
import evaluaciones from './evaluaciones'
/**
* @see \App\Http\Controllers\Instructor\CalendarioController::calendario
* @see app/Http/Controllers/Instructor/CalendarioController.php:18
* @route '/instructor/calendario'
*/
export const calendario = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendario.url(options),
    method: 'get',
})

calendario.definition = {
    methods: ["get","head"],
    url: '/instructor/calendario',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Instructor\CalendarioController::calendario
* @see app/Http/Controllers/Instructor/CalendarioController.php:18
* @route '/instructor/calendario'
*/
calendario.url = (options?: RouteQueryOptions) => {




    return calendario.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Instructor\CalendarioController::calendario
* @see app/Http/Controllers/Instructor/CalendarioController.php:18
* @route '/instructor/calendario'
*/
calendario.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendario.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Instructor\CalendarioController::calendario
* @see app/Http/Controllers/Instructor/CalendarioController.php:18
* @route '/instructor/calendario'
*/
calendario.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calendario.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Instructor\CalendarioController::calendario
* @see app/Http/Controllers/Instructor/CalendarioController.php:18
* @route '/instructor/calendario'
*/
const calendarioForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calendario.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Instructor\CalendarioController::calendario
* @see app/Http/Controllers/Instructor/CalendarioController.php:18
* @route '/instructor/calendario'
*/
calendarioForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calendario.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Instructor\CalendarioController::calendario
* @see app/Http/Controllers/Instructor/CalendarioController.php:18
* @route '/instructor/calendario'
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



const instructor = {
    agenda: Object.assign(agenda, agenda),
    calendario: Object.assign(calendario, calendario),
    turnos: Object.assign(turnos, turnos),
    evaluaciones: Object.assign(evaluaciones, evaluaciones),
}

export default instructor