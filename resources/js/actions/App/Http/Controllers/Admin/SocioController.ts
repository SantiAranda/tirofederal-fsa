import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SocioController::exportar
* @see Http/Controllers/Admin/SocioController.php:178
* @route '/admin/socios/exportar'
*/
export const exportar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportar.url(options),
    method: 'get',
})

exportar.definition = {
    methods: ["get","head"],
    url: '/admin/socios/exportar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SocioController::exportar
* @see Http/Controllers/Admin/SocioController.php:178
* @route '/admin/socios/exportar'
*/
exportar.url = (options?: RouteQueryOptions) => {
    return exportar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SocioController::exportar
* @see Http/Controllers/Admin/SocioController.php:178
* @route '/admin/socios/exportar'
*/
exportar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportar.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::exportar
* @see Http/Controllers/Admin/SocioController.php:178
* @route '/admin/socios/exportar'
*/
exportar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportar.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::exportar
* @see Http/Controllers/Admin/SocioController.php:178
* @route '/admin/socios/exportar'
*/
const exportarForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportar.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::exportar
* @see Http/Controllers/Admin/SocioController.php:178
* @route '/admin/socios/exportar'
*/
exportarForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportar.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::exportar
* @see Http/Controllers/Admin/SocioController.php:178
* @route '/admin/socios/exportar'
*/
exportarForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportar.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportar.form = exportarForm

/**
* @see \App\Http\Controllers\Admin\SocioController::index
* @see Http/Controllers/Admin/SocioController.php:24
* @route '/admin/socios'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/socios',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SocioController::index
* @see Http/Controllers/Admin/SocioController.php:24
* @route '/admin/socios'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SocioController::index
* @see Http/Controllers/Admin/SocioController.php:24
* @route '/admin/socios'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::index
* @see Http/Controllers/Admin/SocioController.php:24
* @route '/admin/socios'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::index
* @see Http/Controllers/Admin/SocioController.php:24
* @route '/admin/socios'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::index
* @see Http/Controllers/Admin/SocioController.php:24
* @route '/admin/socios'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::index
* @see Http/Controllers/Admin/SocioController.php:24
* @route '/admin/socios'
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
* @see \App\Http\Controllers\Admin\SocioController::create
* @see Http/Controllers/Admin/SocioController.php:54
* @route '/admin/socios/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/socios/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SocioController::create
* @see Http/Controllers/Admin/SocioController.php:54
* @route '/admin/socios/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SocioController::create
* @see Http/Controllers/Admin/SocioController.php:54
* @route '/admin/socios/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::create
* @see Http/Controllers/Admin/SocioController.php:54
* @route '/admin/socios/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::create
* @see Http/Controllers/Admin/SocioController.php:54
* @route '/admin/socios/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::create
* @see Http/Controllers/Admin/SocioController.php:54
* @route '/admin/socios/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::create
* @see Http/Controllers/Admin/SocioController.php:54
* @route '/admin/socios/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\Admin\SocioController::store
* @see Http/Controllers/Admin/SocioController.php:63
* @route '/admin/socios'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/socios',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SocioController::store
* @see Http/Controllers/Admin/SocioController.php:63
* @route '/admin/socios'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SocioController::store
* @see Http/Controllers/Admin/SocioController.php:63
* @route '/admin/socios'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::store
* @see Http/Controllers/Admin/SocioController.php:63
* @route '/admin/socios'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::store
* @see Http/Controllers/Admin/SocioController.php:63
* @route '/admin/socios'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\SocioController::show
* @see Http/Controllers/Admin/SocioController.php:0
* @route '/admin/socios/{socio}'
*/
export const show = (args: { socio: string | number } | [socio: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/socios/{socio}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SocioController::show
* @see Http/Controllers/Admin/SocioController.php:0
* @route '/admin/socios/{socio}'
*/
show.url = (args: { socio: string | number } | [socio: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { socio: args }
    }

    if (Array.isArray(args)) {
        args = {
            socio: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        socio: args.socio,
    }

    return show.definition.url
            .replace('{socio}', parsedArgs.socio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SocioController::show
* @see Http/Controllers/Admin/SocioController.php:0
* @route '/admin/socios/{socio}'
*/
show.get = (args: { socio: string | number } | [socio: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::show
* @see Http/Controllers/Admin/SocioController.php:0
* @route '/admin/socios/{socio}'
*/
show.head = (args: { socio: string | number } | [socio: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::show
* @see Http/Controllers/Admin/SocioController.php:0
* @route '/admin/socios/{socio}'
*/
const showForm = (args: { socio: string | number } | [socio: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::show
* @see Http/Controllers/Admin/SocioController.php:0
* @route '/admin/socios/{socio}'
*/
showForm.get = (args: { socio: string | number } | [socio: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::show
* @see Http/Controllers/Admin/SocioController.php:0
* @route '/admin/socios/{socio}'
*/
showForm.head = (args: { socio: string | number } | [socio: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\SocioController::edit
* @see Http/Controllers/Admin/SocioController.php:111
* @route '/admin/socios/{socio}/edit'
*/
export const edit = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/socios/{socio}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SocioController::edit
* @see Http/Controllers/Admin/SocioController.php:111
* @route '/admin/socios/{socio}/edit'
*/
edit.url = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { socio: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { socio: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            socio: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        socio: typeof args.socio === 'object'
        ? args.socio.id
        : args.socio,
    }

    return edit.definition.url
            .replace('{socio}', parsedArgs.socio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SocioController::edit
* @see Http/Controllers/Admin/SocioController.php:111
* @route '/admin/socios/{socio}/edit'
*/
edit.get = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::edit
* @see Http/Controllers/Admin/SocioController.php:111
* @route '/admin/socios/{socio}/edit'
*/
edit.head = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::edit
* @see Http/Controllers/Admin/SocioController.php:111
* @route '/admin/socios/{socio}/edit'
*/
const editForm = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::edit
* @see Http/Controllers/Admin/SocioController.php:111
* @route '/admin/socios/{socio}/edit'
*/
editForm.get = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::edit
* @see Http/Controllers/Admin/SocioController.php:111
* @route '/admin/socios/{socio}/edit'
*/
editForm.head = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Admin\SocioController::update
* @see Http/Controllers/Admin/SocioController.php:122
* @route '/admin/socios/{socio}'
*/
export const update = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/socios/{socio}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\SocioController::update
* @see Http/Controllers/Admin/SocioController.php:122
* @route '/admin/socios/{socio}'
*/
update.url = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { socio: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { socio: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            socio: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        socio: typeof args.socio === 'object'
        ? args.socio.id
        : args.socio,
    }

    return update.definition.url
            .replace('{socio}', parsedArgs.socio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SocioController::update
* @see Http/Controllers/Admin/SocioController.php:122
* @route '/admin/socios/{socio}'
*/
update.put = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::update
* @see Http/Controllers/Admin/SocioController.php:122
* @route '/admin/socios/{socio}'
*/
update.patch = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::update
* @see Http/Controllers/Admin/SocioController.php:122
* @route '/admin/socios/{socio}'
*/
const updateForm = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::update
* @see Http/Controllers/Admin/SocioController.php:122
* @route '/admin/socios/{socio}'
*/
updateForm.put = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::update
* @see Http/Controllers/Admin/SocioController.php:122
* @route '/admin/socios/{socio}'
*/
updateForm.patch = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Admin\SocioController::destroy
* @see Http/Controllers/Admin/SocioController.php:164
* @route '/admin/socios/{socio}'
*/
export const destroy = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/socios/{socio}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\SocioController::destroy
* @see Http/Controllers/Admin/SocioController.php:164
* @route '/admin/socios/{socio}'
*/
destroy.url = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { socio: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { socio: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            socio: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        socio: typeof args.socio === 'object'
        ? args.socio.id
        : args.socio,
    }

    return destroy.definition.url
            .replace('{socio}', parsedArgs.socio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SocioController::destroy
* @see Http/Controllers/Admin/SocioController.php:164
* @route '/admin/socios/{socio}'
*/
destroy.delete = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::destroy
* @see Http/Controllers/Admin/SocioController.php:164
* @route '/admin/socios/{socio}'
*/
const destroyForm = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SocioController::destroy
* @see Http/Controllers/Admin/SocioController.php:164
* @route '/admin/socios/{socio}'
*/
destroyForm.delete = (args: { socio: string | number | { id: string | number } } | [socio: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const SocioController = { exportar, index, create, store, show, edit, update, destroy }

export default SocioController