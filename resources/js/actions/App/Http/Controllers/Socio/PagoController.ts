import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Socio\PagoController::index
* @see Http/Controllers/Socio/PagoController.php:19
* @route '/pagos'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pagos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Socio\PagoController::index
* @see Http/Controllers/Socio/PagoController.php:19
* @route '/pagos'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Socio\PagoController::index
* @see Http/Controllers/Socio/PagoController.php:19
* @route '/pagos'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\PagoController::index
* @see Http/Controllers/Socio/PagoController.php:19
* @route '/pagos'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Socio\PagoController::index
* @see Http/Controllers/Socio/PagoController.php:19
* @route '/pagos'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\PagoController::index
* @see Http/Controllers/Socio/PagoController.php:19
* @route '/pagos'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\PagoController::index
* @see Http/Controllers/Socio/PagoController.php:19
* @route '/pagos'
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
* @see \App\Http\Controllers\Socio\PagoController::descargarPdf
* @see Http/Controllers/Socio/PagoController.php:42
* @route '/pagos/{pago}/pdf'
*/
export const descargarPdf = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: descargarPdf.url(args, options),
    method: 'get',
})

descargarPdf.definition = {
    methods: ["get","head"],
    url: '/pagos/{pago}/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Socio\PagoController::descargarPdf
* @see Http/Controllers/Socio/PagoController.php:42
* @route '/pagos/{pago}/pdf'
*/
descargarPdf.url = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pago: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pago: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pago: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pago: typeof args.pago === 'object'
        ? args.pago.id
        : args.pago,
    }

    return descargarPdf.definition.url
            .replace('{pago}', parsedArgs.pago.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Socio\PagoController::descargarPdf
* @see Http/Controllers/Socio/PagoController.php:42
* @route '/pagos/{pago}/pdf'
*/
descargarPdf.get = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: descargarPdf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\PagoController::descargarPdf
* @see Http/Controllers/Socio/PagoController.php:42
* @route '/pagos/{pago}/pdf'
*/
descargarPdf.head = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: descargarPdf.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Socio\PagoController::descargarPdf
* @see Http/Controllers/Socio/PagoController.php:42
* @route '/pagos/{pago}/pdf'
*/
const descargarPdfForm = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: descargarPdf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\PagoController::descargarPdf
* @see Http/Controllers/Socio/PagoController.php:42
* @route '/pagos/{pago}/pdf'
*/
descargarPdfForm.get = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: descargarPdf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\PagoController::descargarPdf
* @see Http/Controllers/Socio/PagoController.php:42
* @route '/pagos/{pago}/pdf'
*/
descargarPdfForm.head = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: descargarPdf.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

descargarPdf.form = descargarPdfForm

const PagoController = { index, descargarPdf }

export default PagoController