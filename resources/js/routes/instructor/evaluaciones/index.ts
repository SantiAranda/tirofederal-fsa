import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Instructor\EvaluacionController::index
* @see Http/Controllers/Instructor/EvaluacionController.php:15
* @route '/instructor/evaluaciones'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/instructor/evaluaciones',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Instructor\EvaluacionController::index
* @see Http/Controllers/Instructor/EvaluacionController.php:15
* @route '/instructor/evaluaciones'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Instructor\EvaluacionController::index
* @see Http/Controllers/Instructor/EvaluacionController.php:15
* @route '/instructor/evaluaciones'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Instructor\EvaluacionController::index
* @see Http/Controllers/Instructor/EvaluacionController.php:15
* @route '/instructor/evaluaciones'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Instructor\EvaluacionController::index
* @see Http/Controllers/Instructor/EvaluacionController.php:15
* @route '/instructor/evaluaciones'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Instructor\EvaluacionController::index
* @see Http/Controllers/Instructor/EvaluacionController.php:15
* @route '/instructor/evaluaciones'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Instructor\EvaluacionController::index
* @see Http/Controllers/Instructor/EvaluacionController.php:15
* @route '/instructor/evaluaciones'
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

const evaluaciones = {
    index: Object.assign(index, index),
}

export default evaluaciones