import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CluController::verDocumento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/legajo/{credencial}/documento/{tipo}'
*/
const verDocumentoeeb35c9e0b899970c02350a4e8e3a09e = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verDocumentoeeb35c9e0b899970c02350a4e8e3a09e.url(args, options),
    method: 'get',
})

verDocumentoeeb35c9e0b899970c02350a4e8e3a09e.definition = {
    methods: ["get","head"],
    url: '/legajo/{credencial}/documento/{tipo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CluController::verDocumento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/legajo/{credencial}/documento/{tipo}'
*/
verDocumentoeeb35c9e0b899970c02350a4e8e3a09e.url = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions) => {
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

    return verDocumentoeeb35c9e0b899970c02350a4e8e3a09e.definition.url
            .replace('{credencial}', parsedArgs.credencial.toString())
            .replace('{tipo}', parsedArgs.tipo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CluController::verDocumento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/legajo/{credencial}/documento/{tipo}'
*/
verDocumentoeeb35c9e0b899970c02350a4e8e3a09e.get = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verDocumentoeeb35c9e0b899970c02350a4e8e3a09e.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::verDocumento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/legajo/{credencial}/documento/{tipo}'
*/
verDocumentoeeb35c9e0b899970c02350a4e8e3a09e.head = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verDocumentoeeb35c9e0b899970c02350a4e8e3a09e.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CluController::verDocumento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/legajo/{credencial}/documento/{tipo}'
*/
const verDocumentoeeb35c9e0b899970c02350a4e8e3a09eForm = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verDocumentoeeb35c9e0b899970c02350a4e8e3a09e.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::verDocumento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/legajo/{credencial}/documento/{tipo}'
*/
verDocumentoeeb35c9e0b899970c02350a4e8e3a09eForm.get = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verDocumentoeeb35c9e0b899970c02350a4e8e3a09e.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::verDocumento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/legajo/{credencial}/documento/{tipo}'
*/
verDocumentoeeb35c9e0b899970c02350a4e8e3a09eForm.head = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verDocumentoeeb35c9e0b899970c02350a4e8e3a09e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

verDocumentoeeb35c9e0b899970c02350a4e8e3a09e.form = verDocumentoeeb35c9e0b899970c02350a4e8e3a09eForm
/**
* @see \App\Http\Controllers\Admin\CluController::verDocumento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/admin/clu/{credencial}/documento/{tipo}'
*/
const verDocumento8d8ea65ec4254586f2528da8c62a190d = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verDocumento8d8ea65ec4254586f2528da8c62a190d.url(args, options),
    method: 'get',
})

verDocumento8d8ea65ec4254586f2528da8c62a190d.definition = {
    methods: ["get","head"],
    url: '/admin/clu/{credencial}/documento/{tipo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CluController::verDocumento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/admin/clu/{credencial}/documento/{tipo}'
*/
verDocumento8d8ea65ec4254586f2528da8c62a190d.url = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions) => {
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

    return verDocumento8d8ea65ec4254586f2528da8c62a190d.definition.url
            .replace('{credencial}', parsedArgs.credencial.toString())
            .replace('{tipo}', parsedArgs.tipo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CluController::verDocumento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/admin/clu/{credencial}/documento/{tipo}'
*/
verDocumento8d8ea65ec4254586f2528da8c62a190d.get = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verDocumento8d8ea65ec4254586f2528da8c62a190d.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::verDocumento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/admin/clu/{credencial}/documento/{tipo}'
*/
verDocumento8d8ea65ec4254586f2528da8c62a190d.head = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verDocumento8d8ea65ec4254586f2528da8c62a190d.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CluController::verDocumento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/admin/clu/{credencial}/documento/{tipo}'
*/
const verDocumento8d8ea65ec4254586f2528da8c62a190dForm = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verDocumento8d8ea65ec4254586f2528da8c62a190d.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::verDocumento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/admin/clu/{credencial}/documento/{tipo}'
*/
verDocumento8d8ea65ec4254586f2528da8c62a190dForm.get = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verDocumento8d8ea65ec4254586f2528da8c62a190d.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::verDocumento
* @see Http/Controllers/Admin/CluController.php:93
* @route '/admin/clu/{credencial}/documento/{tipo}'
*/
verDocumento8d8ea65ec4254586f2528da8c62a190dForm.head = (args: { credencial: string | number | { id: string | number }, tipo: string | number } | [credencial: string | number | { id: string | number }, tipo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verDocumento8d8ea65ec4254586f2528da8c62a190d.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

verDocumento8d8ea65ec4254586f2528da8c62a190d.form = verDocumento8d8ea65ec4254586f2528da8c62a190dForm

/**
* Multiple routes resolve to \App\Http\Controllers\Admin\CluController::verDocumento, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `verDocumento['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const verDocumento = {
    '/legajo/{credencial}/documento/{tipo}': verDocumentoeeb35c9e0b899970c02350a4e8e3a09e,
    '/admin/clu/{credencial}/documento/{tipo}': verDocumento8d8ea65ec4254586f2528da8c62a190d,
}

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

const CluController = { verDocumento, index, show, validar }

export default CluController