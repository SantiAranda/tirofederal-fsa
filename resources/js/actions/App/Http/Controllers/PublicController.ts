import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PublicController::home
* @see app/Http/Controllers/PublicController.php:19
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
* @see app/Http/Controllers/PublicController.php:19
* @route '/'
*/
home.url = (options?: RouteQueryOptions) => {




    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::home
* @see app/Http/Controllers/PublicController.php:19
* @route '/'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::home
* @see app/Http/Controllers/PublicController.php:19
* @route '/'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::home
* @see app/Http/Controllers/PublicController.php:19
* @route '/'
*/
const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::home
* @see app/Http/Controllers/PublicController.php:19
* @route '/'
*/
homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::home
* @see app/Http/Controllers/PublicController.php:19
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
* @see app/Http/Controllers/PublicController.php:48
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
* @see app/Http/Controllers/PublicController.php:48
* @route '/historia'
*/
historia.url = (options?: RouteQueryOptions) => {




    return historia.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::historia
* @see app/Http/Controllers/PublicController.php:48
* @route '/historia'
*/
historia.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: historia.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::historia
* @see app/Http/Controllers/PublicController.php:48
* @route '/historia'
*/
historia.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: historia.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::historia
* @see app/Http/Controllers/PublicController.php:48
* @route '/historia'
*/
const historiaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: historia.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::historia
* @see app/Http/Controllers/PublicController.php:48
* @route '/historia'
*/
historiaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: historia.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::historia
* @see app/Http/Controllers/PublicController.php:48
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
* @see app/Http/Controllers/PublicController.php:60
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
* @see app/Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
disciplinas.url = (options?: RouteQueryOptions) => {




    return disciplinas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see app/Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
disciplinas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: disciplinas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see app/Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
disciplinas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: disciplinas.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see app/Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
const disciplinasForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: disciplinas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see app/Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
disciplinasForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: disciplinas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see app/Http/Controllers/PublicController.php:60
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
* @see app/Http/Controllers/PublicController.php:86
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
* @see app/Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
decalogo.url = (options?: RouteQueryOptions) => {




    return decalogo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see app/Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
decalogo.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: decalogo.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see app/Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
decalogo.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: decalogo.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see app/Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
const decalogoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: decalogo.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see app/Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
decalogoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: decalogo.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see app/Http/Controllers/PublicController.php:86
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
* @see app/Http/Controllers/PublicController.php:109
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
* @see app/Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
eventos.url = (options?: RouteQueryOptions) => {




    return eventos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see app/Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
eventos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see app/Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
eventos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: eventos.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see app/Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
const eventosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: eventos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see app/Http/Controllers/PublicController.php:109
* @route '/eventos'
*/
eventosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: eventos.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::eventos
* @see app/Http/Controllers/PublicController.php:109
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
* @see \App\Http\Controllers\PublicController::calendario
* @see app/Http/Controllers/PublicController.php:131
* @route '/calendario'
*/
export const calendario = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendario.url(options),
    method: 'get',
})

calendario.definition = {
    methods: ["get","head"],
    url: '/calendario',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::calendario
* @see app/Http/Controllers/PublicController.php:131
* @route '/calendario'
*/
calendario.url = (options?: RouteQueryOptions) => {




    return calendario.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::calendario
* @see app/Http/Controllers/PublicController.php:131
* @route '/calendario'
*/
calendario.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendario.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::calendario
* @see app/Http/Controllers/PublicController.php:131
* @route '/calendario'
*/
calendario.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calendario.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::calendario
* @see app/Http/Controllers/PublicController.php:131
* @route '/calendario'
*/
const calendarioForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calendario.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::calendario
* @see app/Http/Controllers/PublicController.php:131
* @route '/calendario'
*/
calendarioForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: calendario.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::calendario
* @see app/Http/Controllers/PublicController.php:131
* @route '/calendario'
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

/**
* @see \App\Http\Controllers\PublicController::eventoDetalle
* @see app/Http/Controllers/PublicController.php:178
* @route '/eventos/{evento}'
*/
export const eventoDetalle = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventoDetalle.url(args, options),
    method: 'get',
})

eventoDetalle.definition = {
    methods: ["get","head"],
    url: '/eventos/{evento}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::eventoDetalle
* @see app/Http/Controllers/PublicController.php:178
* @route '/eventos/{evento}'
*/
eventoDetalle.url = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return eventoDetalle.definition.url
            .replace('{evento}', parsedArgs.evento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::eventoDetalle
* @see app/Http/Controllers/PublicController.php:178
* @route '/eventos/{evento}'
*/
eventoDetalle.get = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventoDetalle.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::eventoDetalle
* @see app/Http/Controllers/PublicController.php:178
* @route '/eventos/{evento}'
*/
eventoDetalle.head = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: eventoDetalle.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::eventoDetalle
* @see app/Http/Controllers/PublicController.php:178
* @route '/eventos/{evento}'
*/
const eventoDetalleForm = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: eventoDetalle.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::eventoDetalle
* @see app/Http/Controllers/PublicController.php:178
* @route '/eventos/{evento}'
*/
eventoDetalleForm.get = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: eventoDetalle.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::eventoDetalle
* @see app/Http/Controllers/PublicController.php:178
* @route '/eventos/{evento}'
*/
eventoDetalleForm.head = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: eventoDetalle.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

eventoDetalle.form = eventoDetalleForm

/**
* @see \App\Http\Controllers\PublicController::noticias
* @see app/Http/Controllers/PublicController.php:211
* @route '/noticias'
*/
export const noticias = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: noticias.url(options),
    method: 'get',
})

noticias.definition = {
    methods: ["get","head"],
    url: '/noticias',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::noticias
* @see app/Http/Controllers/PublicController.php:211
* @route '/noticias'
*/
noticias.url = (options?: RouteQueryOptions) => {




    return noticias.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::noticias
* @see app/Http/Controllers/PublicController.php:211
* @route '/noticias'
*/
noticias.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: noticias.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::noticias
* @see app/Http/Controllers/PublicController.php:211
* @route '/noticias'
*/
noticias.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: noticias.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::noticias
* @see app/Http/Controllers/PublicController.php:211
* @route '/noticias'
*/
const noticiasForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: noticias.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::noticias
* @see app/Http/Controllers/PublicController.php:211
* @route '/noticias'
*/
noticiasForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: noticias.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::noticias
* @see app/Http/Controllers/PublicController.php:211
* @route '/noticias'
*/
noticiasForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: noticias.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

noticias.form = noticiasForm

/**
* @see \App\Http\Controllers\PublicController::noticiaDetalle
* @see app/Http/Controllers/PublicController.php:248
* @route '/noticias/{slug}'
*/
export const noticiaDetalle = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: noticiaDetalle.url(args, options),
    method: 'get',
})

noticiaDetalle.definition = {
    methods: ["get","head"],
    url: '/noticias/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::noticiaDetalle
* @see app/Http/Controllers/PublicController.php:248
* @route '/noticias/{slug}'
*/
noticiaDetalle.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }


    if (Array.isArray(args)) {
        args = {
            slug: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        slug: args.slug,
    }

    return noticiaDetalle.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::noticiaDetalle
* @see app/Http/Controllers/PublicController.php:248
* @route '/noticias/{slug}'
*/
noticiaDetalle.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: noticiaDetalle.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::noticiaDetalle
* @see app/Http/Controllers/PublicController.php:248
* @route '/noticias/{slug}'
*/
noticiaDetalle.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: noticiaDetalle.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::noticiaDetalle
* @see app/Http/Controllers/PublicController.php:248
* @route '/noticias/{slug}'
*/
const noticiaDetalleForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: noticiaDetalle.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::noticiaDetalle
* @see app/Http/Controllers/PublicController.php:248
* @route '/noticias/{slug}'
*/
noticiaDetalleForm.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: noticiaDetalle.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::noticiaDetalle
* @see app/Http/Controllers/PublicController.php:248
* @route '/noticias/{slug}'
*/
noticiaDetalleForm.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: noticiaDetalle.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

noticiaDetalle.form = noticiaDetalleForm

/**
* @see \App\Http\Controllers\PublicController::enviarContacto
* @see app/Http/Controllers/PublicController.php:239
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
* @see app/Http/Controllers/PublicController.php:239
* @route '/contacto'
*/
enviarContacto.url = (options?: RouteQueryOptions) => {




    return enviarContacto.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::enviarContacto
* @see app/Http/Controllers/PublicController.php:239
* @route '/contacto'
*/
enviarContacto.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enviarContacto.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PublicController::enviarContacto
* @see app/Http/Controllers/PublicController.php:239
* @route '/contacto'
*/
const enviarContactoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enviarContacto.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PublicController::enviarContacto
* @see app/Http/Controllers/PublicController.php:239
* @route '/contacto'
*/
enviarContactoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enviarContacto.url(options),
    method: 'post',
})

enviarContacto.form = enviarContactoForm

const PublicController = { home, historia, disciplinas, decalogo, eventos, calendario, eventoDetalle, noticias, noticiaDetalle, enviarContacto }

export default PublicController