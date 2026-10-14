import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Socio\EvaluacionController::store
* @see Http/Controllers/Socio/EvaluacionController.php:16
* @route '/evaluaciones'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/evaluaciones',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Socio\EvaluacionController::store
* @see Http/Controllers/Socio/EvaluacionController.php:16
* @route '/evaluaciones'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Socio\EvaluacionController::store
* @see Http/Controllers/Socio/EvaluacionController.php:16
* @route '/evaluaciones'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Socio\EvaluacionController::store
* @see Http/Controllers/Socio/EvaluacionController.php:16
* @route '/evaluaciones'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Socio\EvaluacionController::store
* @see Http/Controllers/Socio/EvaluacionController.php:16
* @route '/evaluaciones'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const evaluaciones = {
    store: Object.assign(store, store),
}

export default evaluaciones