import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Socio\PerfilController::edit
* @see Http/Controllers/Socio/PerfilController.php:22
* @route '/perfil'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/perfil',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Socio\PerfilController::edit
* @see Http/Controllers/Socio/PerfilController.php:22
* @route '/perfil'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Socio\PerfilController::edit
* @see Http/Controllers/Socio/PerfilController.php:22
* @route '/perfil'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\PerfilController::edit
* @see Http/Controllers/Socio/PerfilController.php:22
* @route '/perfil'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Socio\PerfilController::edit
* @see Http/Controllers/Socio/PerfilController.php:22
* @route '/perfil'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\PerfilController::edit
* @see Http/Controllers/Socio/PerfilController.php:22
* @route '/perfil'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Socio\PerfilController::edit
* @see Http/Controllers/Socio/PerfilController.php:22
* @route '/perfil'
*/
editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Socio\PerfilController::update
* @see Http/Controllers/Socio/PerfilController.php:37
* @route '/perfil'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/perfil',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Socio\PerfilController::update
* @see Http/Controllers/Socio/PerfilController.php:37
* @route '/perfil'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Socio\PerfilController::update
* @see Http/Controllers/Socio/PerfilController.php:37
* @route '/perfil'
*/
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Socio\PerfilController::update
* @see Http/Controllers/Socio/PerfilController.php:37
* @route '/perfil'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Socio\PerfilController::update
* @see Http/Controllers/Socio/PerfilController.php:37
* @route '/perfil'
*/
updateForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Socio\PerfilController::destroy
* @see Http/Controllers/Socio/PerfilController.php:76
* @route '/perfil'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/perfil',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Socio\PerfilController::destroy
* @see Http/Controllers/Socio/PerfilController.php:76
* @route '/perfil'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Socio\PerfilController::destroy
* @see Http/Controllers/Socio/PerfilController.php:76
* @route '/perfil'
*/
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Socio\PerfilController::destroy
* @see Http/Controllers/Socio/PerfilController.php:76
* @route '/perfil'
*/
const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Socio\PerfilController::destroy
* @see Http/Controllers/Socio/PerfilController.php:76
* @route '/perfil'
*/
destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const PerfilController = { edit, update, destroy }

export default PerfilController