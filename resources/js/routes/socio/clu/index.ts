import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CluController::documento
* @see app/Http/Controllers/Admin/CluController.php:93
* @route '/legajo/{credencial}/documento/{tipo}'
*/
export const documento = (args: { credencial: number | { id: number }, tipo: string | number } | [credencial: number | { id: number }, tipo: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: documento.url(args, options),
    method: 'get',
})

documento.definition = {
    methods: ["get","head"],
    url: '/legajo/{credencial}/documento/{tipo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CluController::documento
* @see app/Http/Controllers/Admin/CluController.php:93
* @route '/legajo/{credencial}/documento/{tipo}'
*/
documento.url = (args: { credencial: number | { id: number }, tipo: string | number } | [credencial: number | { id: number }, tipo: string | number ], options?: RouteQueryOptions) => {

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
* @see app/Http/Controllers/Admin/CluController.php:93
* @route '/legajo/{credencial}/documento/{tipo}'
*/
documento.get = (args: { credencial: number | { id: number }, tipo: string | number } | [credencial: number | { id: number }, tipo: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: documento.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::documento
* @see app/Http/Controllers/Admin/CluController.php:93
* @route '/legajo/{credencial}/documento/{tipo}'
*/
documento.head = (args: { credencial: number | { id: number }, tipo: string | number } | [credencial: number | { id: number }, tipo: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: documento.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CluController::documento
* @see app/Http/Controllers/Admin/CluController.php:93
* @route '/legajo/{credencial}/documento/{tipo}'
*/
const documentoForm = (args: { credencial: number | { id: number }, tipo: string | number } | [credencial: number | { id: number }, tipo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: documento.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::documento
* @see app/Http/Controllers/Admin/CluController.php:93
* @route '/legajo/{credencial}/documento/{tipo}'
*/
documentoForm.get = (args: { credencial: number | { id: number }, tipo: string | number } | [credencial: number | { id: number }, tipo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: documento.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CluController::documento
* @see app/Http/Controllers/Admin/CluController.php:93
* @route '/legajo/{credencial}/documento/{tipo}'
*/
documentoForm.head = (args: { credencial: number | { id: number }, tipo: string | number } | [credencial: number | { id: number }, tipo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
    documento: Object.assign(documento, documento),
}

export default clu