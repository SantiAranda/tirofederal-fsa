import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Socio\EventoController::inscribir
* @see Http/Controllers/Socio/EventoController.php:18
* @route '/eventos/{evento}/inscribir'
*/
export const inscribir = (args: { evento: string | number | { id: string | number } } | [evento: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: inscribir.url(args, options),
    method: 'post',
})

inscribir.definition = {
    methods: ["post"],
    url: '/eventos/{evento}/inscribir',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Socio\EventoController::inscribir
* @see Http/Controllers/Socio/EventoController.php:18
* @route '/eventos/{evento}/inscribir'
*/
inscribir.url = (args: { evento: string | number | { id: string | number } } | [evento: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return inscribir.definition.url
            .replace('{evento}', parsedArgs.evento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Socio\EventoController::inscribir
* @see Http/Controllers/Socio/EventoController.php:18
* @route '/eventos/{evento}/inscribir'
*/
inscribir.post = (args: { evento: string | number | { id: string | number } } | [evento: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: inscribir.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Socio\EventoController::inscribir
* @see Http/Controllers/Socio/EventoController.php:18
* @route '/eventos/{evento}/inscribir'
*/
const inscribirForm = (args: { evento: string | number | { id: string | number } } | [evento: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: inscribir.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Socio\EventoController::inscribir
* @see Http/Controllers/Socio/EventoController.php:18
* @route '/eventos/{evento}/inscribir'
*/
inscribirForm.post = (args: { evento: string | number | { id: string | number } } | [evento: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: inscribir.url(args, options),
    method: 'post',
})

inscribir.form = inscribirForm

const eventos = {
    inscribir: Object.assign(inscribir, inscribir),
}

export default eventos