import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PublicController::home
* @see Http/Controllers/PublicController.php:19
* @route '/'
*/
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::home
* @see Http/Controllers/PublicController.php:19
* @route '/'
*/
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::home
* @see Http/Controllers/PublicController.php:19
* @route '/'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::home
* @see Http/Controllers/PublicController.php:19
* @route '/'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::home
* @see Http/Controllers/PublicController.php:19
* @route '/'
*/
const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::home
* @see Http/Controllers/PublicController.php:19
* @route '/'
*/
homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::home
* @see Http/Controllers/PublicController.php:19
* @route '/'
*/
homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

home.form = homeForm

/**
* @see \App\Http\Controllers\PublicController::historia
* @see Http/Controllers/PublicController.php:48
* @route '/historia'
*/
export const historia = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: historia.url(options),
    method: 'get',
})

historia.definition = {
    methods: ["get","head"],
    url: '/historia',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::historia
* @see Http/Controllers/PublicController.php:48
* @route '/historia'
*/
historia.url = (options?: RouteQueryOptions) => {
    return historia.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::historia
* @see Http/Controllers/PublicController.php:48
* @route '/historia'
*/
historia.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: historia.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::historia
* @see Http/Controllers/PublicController.php:48
* @route '/historia'
*/
historia.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: historia.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::historia
* @see Http/Controllers/PublicController.php:48
* @route '/historia'
*/
const historiaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: historia.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::historia
* @see Http/Controllers/PublicController.php:48
* @route '/historia'
*/
historiaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: historia.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::historia
* @see Http/Controllers/PublicController.php:48
* @route '/historia'
*/
historiaForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: historia.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

historia.form = historiaForm

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
export const disciplinas = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: disciplinas.url(options),
    method: 'get',
})

disciplinas.definition = {
    methods: ["get","head"],
    url: '/disciplinas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
disciplinas.url = (options?: RouteQueryOptions) => {
    return disciplinas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
disciplinas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: disciplinas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
disciplinas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: disciplinas.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
const disciplinasForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: disciplinas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
disciplinasForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: disciplinas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
disciplinasForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: disciplinas.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

disciplinas.form = disciplinasForm

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
export const decalogo = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: decalogo.url(options),
    method: 'get',
})

decalogo.definition = {
    methods: ["get","head"],
    url: '/decalogo',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
decalogo.url = (options?: RouteQueryOptions) => {
    return decalogo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
decalogo.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: decalogo.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
decalogo.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: decalogo.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
const decalogoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: decalogo.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
decalogoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: decalogo.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
decalogoForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: decalogo.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

decalogo.form = decalogoForm

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:109
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
* @see Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
eventos.url = (options?: RouteQueryOptions) => {
    return eventos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
eventos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
eventos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: eventos.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
const eventosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: eventos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
eventosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: eventos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see Http/Controllers/PublicController.php:109
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
* @see \App\Http\Controllers\PublicController::enviarContacto
* @see Http/Controllers/PublicController.php:123
* @route '/contacto'
*/
export const enviarContacto = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enviarContacto.url(options),
    method: 'post',
})

enviarContacto.definition = {
    methods: ["post"],
    url: '/contacto',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PublicController::enviarContacto
* @see Http/Controllers/PublicController.php:123
* @route '/contacto'
*/
enviarContacto.url = (options?: RouteQueryOptions) => {
    return enviarContacto.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::enviarContacto
* @see Http/Controllers/PublicController.php:123
* @route '/contacto'
*/
enviarContacto.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enviarContacto.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PublicController::enviarContacto
* @see Http/Controllers/PublicController.php:123
* @route '/contacto'
*/
const enviarContactoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enviarContacto.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PublicController::enviarContacto
* @see Http/Controllers/PublicController.php:123
* @route '/contacto'
*/
enviarContactoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enviarContacto.url(options),
    method: 'post',
})

enviarContacto.form = enviarContactoForm

const PublicController = { home, historia, disciplinas, decalogo, eventos, enviarContacto }

export default PublicController