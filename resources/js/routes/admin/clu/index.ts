import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CluController::index
* @see Http/Controllers/Admin/CluController.php:22
* @route '/admin/clu'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/clu',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CluController::index
* @see Http/Controllers/Admin/CluController.php:22
* @route '/admin/clu'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CluController::index
* @see Http/Controllers/Admin/CluController.php:22
* @route '/admin/clu'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::index
* @see Http/Controllers/Admin/CluController.php:22
* @route '/admin/clu'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CluController::index
* @see Http/Controllers/Admin/CluController.php:22
* @route '/admin/clu'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::index
* @see Http/Controllers/Admin/CluController.php:22
* @route '/admin/clu'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::index
* @see Http/Controllers/Admin/CluController.php:22
* @route '/admin/clu'
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
* @see \App\Http\Controllers\Admin\CluController::show
* @see Http/Controllers/Admin/CluController.php:58
* @route '/admin/clu/{credencial}'
*/
export const show = (args: { credencial: string | number | { id: string | number } } | [credencial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/clu/{credencial}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CluController::show
* @see Http/Controllers/Admin/CluController.php:58
* @route '/admin/clu/{credencial}'
*/
show.url = (args: { credencial: string | number | { id: string | number } } | [credencial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { credencial: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { credencial: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            credencial: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        credencial: typeof args.credencial === 'object'
        ? args.credencial.id
        : args.credencial,
    }

    return show.definition.url
            .replace('{credencial}', parsedArgs.credencial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CluController::show
* @see Http/Controllers/Admin/CluController.php:58
* @route '/admin/clu/{credencial}'
*/
show.get = (args: { credencial: string | number | { id: string | number } } | [credencial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::show
* @see Http/Controllers/Admin/CluController.php:58
* @route '/admin/clu/{credencial}'
*/
show.head = (args: { credencial: string | number | { id: string | number } } | [credencial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CluController::show
* @see Http/Controllers/Admin/CluController.php:58
* @route '/admin/clu/{credencial}'
*/
const showForm = (args: { credencial: string | number | { id: string | number } } | [credencial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::show
* @see Http/Controllers/Admin/CluController.php:58
* @route '/admin/clu/{credencial}'
*/
showForm.get = (args: { credencial: string | number | { id: string | number } } | [credencial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::show
* @see Http/Controllers/Admin/CluController.php:58
* @route '/admin/clu/{credencial}'
*/
showForm.head = (args: { credencial: string | number | { id: string | number } } | [credencial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Admin\CluController::validar
* @see Http/Controllers/Admin/CluController.php:72
* @route '/admin/clu/{credencial}/validar'
*/
export const validar = (args: { credencial: string | number | { id: string | number } } | [credencial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: validar.url(args, options),
    method: 'patch',
})

validar.definition = {
    methods: ["patch"],
    url: '/admin/clu/{credencial}/validar',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\CluController::validar
* @see Http/Controllers/Admin/CluController.php:72
* @route '/admin/clu/{credencial}/validar'
*/
validar.url = (args: { credencial: string | number | { id: string | number } } | [credencial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { credencial: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { credencial: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            credencial: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        credencial: typeof args.credencial === 'object'
        ? args.credencial.id
        : args.credencial,
    }

    return validar.definition.url
            .replace('{credencial}', parsedArgs.credencial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CluController::validar
* @see Http/Controllers/Admin/CluController.php:72
* @route '/admin/clu/{credencial}/validar'
*/
validar.patch = (args: { credencial: string | number | { id: string | number } } | [credencial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: validar.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\CluController::validar
* @see Http/Controllers/Admin/CluController.php:72
* @route '/admin/clu/{credencial}/validar'
*/
const validarForm = (args: { credencial: string | number | { id: string | number } } | [credencial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validar.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CluController::validar
* @see Http/Controllers/Admin/CluController.php:72
* @route '/admin/clu/{credencial}/validar'
*/
validarForm.patch = (args: { credencial: string | number | { id: string | number } } | [credencial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validar.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

validar.form = validarForm

/**
* @see \App\Http\Controllers\Admin\CluController::documento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/admin/clu/{credencial}/documento/{tipo}'
*/
export const documento = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: documento.url(args, options),
    method: 'get',
})

documento.definition = {
    methods: ["get","head"],
    url: '/admin/clu/{credencial}/documento/{tipo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CluController::documento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/admin/clu/{credencial}/documento/{tipo}'
*/
documento.url = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            credencial: args[0],
            tipo: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        credencial: typeof args.credencial === 'object'
        ? args.credencial.id
        : args.credencial,
        tipo: args.tipo,
    }

    return documento.definition.url
            .replace('{credencial}', parsedArgs.credencial.toString())
            .replace('{tipo}', parsedArgs.tipo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CluController::documento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/admin/clu/{credencial}/documento/{tipo}'
*/
documento.get = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: documento.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::documento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/admin/clu/{credencial}/documento/{tipo}'
*/
documento.head = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: documento.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CluController::documento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/admin/clu/{credencial}/documento/{tipo}'
*/
const documentoForm = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: documento.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::documento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/admin/clu/{credencial}/documento/{tipo}'
*/
documentoForm.get = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: documento.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::documento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/admin/clu/{credencial}/documento/{tipo}'
*/
documentoForm.head = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: documento.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

documento.form = documentoForm

const clu = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    validar: Object.assign(validar, validar),
    documento: Object.assign(documento, documento),
}

export default clu