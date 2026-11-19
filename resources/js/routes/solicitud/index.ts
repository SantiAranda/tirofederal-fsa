import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see routes/web.php:61
* @route '/solicitud-en-tramite'
*/
export const tramite = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tramite.url(options),
    method: 'get',
})

tramite.definition = {
    methods: ["get","head"],
    url: '/solicitud-en-tramite',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:61
* @route '/solicitud-en-tramite'
*/
tramite.url = (options?: RouteQueryOptions) => {




    return tramite.definition.url + queryParams(options)
}

/**
* @see routes/web.php:61
* @route '/solicitud-en-tramite'
*/
tramite.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tramite.url(options),
    method: 'get',
})

/**
* @see routes/web.php:61
* @route '/solicitud-en-tramite'
*/
tramite.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: tramite.url(options),
    method: 'head',
})

/**
* @see routes/web.php:61
* @route '/solicitud-en-tramite'
*/
const tramiteForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: tramite.url(options),
    method: 'get',
})

/**
* @see routes/web.php:61
* @route '/solicitud-en-tramite'
*/
tramiteForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: tramite.url(options),
    method: 'get',
})

/**
* @see routes/web.php:61
* @route '/solicitud-en-tramite'
*/
tramiteForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: tramite.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

tramite.form = tramiteForm



const solicitud = {
    tramite: Object.assign(tramite, tramite),
}

export default solicitud