import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PublicController::enviar
* @see Http/Controllers/PublicController.php:123
* @route '/contacto'
*/
export const enviar = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enviar.url(options),
    method: 'post',
})

enviar.definition = {
    methods: ["post"],
    url: '/contacto',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PublicController::enviar
* @see Http/Controllers/PublicController.php:123
* @route '/contacto'
*/
enviar.url = (options?: RouteQueryOptions) => {
    return enviar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::enviar
* @see Http/Controllers/PublicController.php:123
* @route '/contacto'
*/
enviar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enviar.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PublicController::enviar
* @see Http/Controllers/PublicController.php:123
* @route '/contacto'
*/
const enviarForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enviar.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PublicController::enviar
* @see Http/Controllers/PublicController.php:123
* @route '/contacto'
*/
enviarForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enviar.url(options),
    method: 'post',
})

enviar.form = enviarForm

const contacto = {
    enviar: Object.assign(enviar, enviar),
}

export default contacto