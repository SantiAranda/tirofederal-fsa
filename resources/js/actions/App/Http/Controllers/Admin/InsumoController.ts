import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\InsumoController::ajustarStock
* @see Http/Controllers/Admin/InsumoController.php:80
* @route '/admin/insumos/{insumo}/stock'
*/
export const ajustarStock = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: ajustarStock.url(args, options),
    method: 'patch',
})

ajustarStock.definition = {
    methods: ["patch"],
    url: '/admin/insumos/{insumo}/stock',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\InsumoController::ajustarStock
* @see Http/Controllers/Admin/InsumoController.php:80
* @route '/admin/insumos/{insumo}/stock'
*/
ajustarStock.url = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { insumo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { insumo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            insumo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        insumo: typeof args.insumo === 'object'
        ? args.insumo.id
        : args.insumo,
    }

    return ajustarStock.definition.url
            .replace('{insumo}', parsedArgs.insumo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InsumoController::ajustarStock
* @see Http/Controllers/Admin/InsumoController.php:80
* @route '/admin/insumos/{insumo}/stock'
*/
ajustarStock.patch = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: ajustarStock.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::ajustarStock
* @see Http/Controllers/Admin/InsumoController.php:80
* @route '/admin/insumos/{insumo}/stock'
*/
const ajustarStockForm = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: ajustarStock.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::ajustarStock
* @see Http/Controllers/Admin/InsumoController.php:80
* @route '/admin/insumos/{insumo}/stock'
*/
ajustarStockForm.patch = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: ajustarStock.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

ajustarStock.form = ajustarStockForm

/**
* @see \App\Http\Controllers\Admin\InsumoController::index
* @see Http/Controllers/Admin/InsumoController.php:17
* @route '/admin/insumos'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/insumos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InsumoController::index
* @see Http/Controllers/Admin/InsumoController.php:17
* @route '/admin/insumos'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InsumoController::index
* @see Http/Controllers/Admin/InsumoController.php:17
* @route '/admin/insumos'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::index
* @see Http/Controllers/Admin/InsumoController.php:17
* @route '/admin/insumos'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::index
* @see Http/Controllers/Admin/InsumoController.php:17
* @route '/admin/insumos'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::index
* @see Http/Controllers/Admin/InsumoController.php:17
* @route '/admin/insumos'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::index
* @see Http/Controllers/Admin/InsumoController.php:17
* @route '/admin/insumos'
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
* @see \App\Http\Controllers\Admin\InsumoController::create
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/insumos/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InsumoController::create
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InsumoController::create
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::create
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::create
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::create
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::create
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/create'
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
* @see \App\Http\Controllers\Admin\InsumoController::store
* @see Http/Controllers/Admin/InsumoController.php:44
* @route '/admin/insumos'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/insumos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InsumoController::store
* @see Http/Controllers/Admin/InsumoController.php:44
* @route '/admin/insumos'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InsumoController::store
* @see Http/Controllers/Admin/InsumoController.php:44
* @route '/admin/insumos'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::store
* @see Http/Controllers/Admin/InsumoController.php:44
* @route '/admin/insumos'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::store
* @see Http/Controllers/Admin/InsumoController.php:44
* @route '/admin/insumos'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\InsumoController::show
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/{insumo}'
*/
export const show = (args: { insumo: string | number } | [insumo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/insumos/{insumo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InsumoController::show
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/{insumo}'
*/
show.url = (args: { insumo: string | number } | [insumo: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { insumo: args }
    }

    if (Array.isArray(args)) {
        args = {
            insumo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        insumo: args.insumo,
    }

    return show.definition.url
            .replace('{insumo}', parsedArgs.insumo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InsumoController::show
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/{insumo}'
*/
show.get = (args: { insumo: string | number } | [insumo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::show
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/{insumo}'
*/
show.head = (args: { insumo: string | number } | [insumo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::show
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/{insumo}'
*/
const showForm = (args: { insumo: string | number } | [insumo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::show
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/{insumo}'
*/
showForm.get = (args: { insumo: string | number } | [insumo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::show
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/{insumo}'
*/
showForm.head = (args: { insumo: string | number } | [insumo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\InsumoController::edit
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/{insumo}/edit'
*/
export const edit = (args: { insumo: string | number } | [insumo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/insumos/{insumo}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InsumoController::edit
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/{insumo}/edit'
*/
edit.url = (args: { insumo: string | number } | [insumo: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { insumo: args }
    }

    if (Array.isArray(args)) {
        args = {
            insumo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        insumo: args.insumo,
    }

    return edit.definition.url
            .replace('{insumo}', parsedArgs.insumo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InsumoController::edit
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/{insumo}/edit'
*/
edit.get = (args: { insumo: string | number } | [insumo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::edit
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/{insumo}/edit'
*/
edit.head = (args: { insumo: string | number } | [insumo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::edit
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/{insumo}/edit'
*/
const editForm = (args: { insumo: string | number } | [insumo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::edit
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/{insumo}/edit'
*/
editForm.get = (args: { insumo: string | number } | [insumo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::edit
* @see Http/Controllers/Admin/InsumoController.php:0
* @route '/admin/insumos/{insumo}/edit'
*/
editForm.head = (args: { insumo: string | number } | [insumo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\InsumoController::update
* @see Http/Controllers/Admin/InsumoController.php:62
* @route '/admin/insumos/{insumo}'
*/
export const update = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/insumos/{insumo}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\InsumoController::update
* @see Http/Controllers/Admin/InsumoController.php:62
* @route '/admin/insumos/{insumo}'
*/
update.url = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { insumo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { insumo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            insumo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        insumo: typeof args.insumo === 'object'
        ? args.insumo.id
        : args.insumo,
    }

    return update.definition.url
            .replace('{insumo}', parsedArgs.insumo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InsumoController::update
* @see Http/Controllers/Admin/InsumoController.php:62
* @route '/admin/insumos/{insumo}'
*/
update.put = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::update
* @see Http/Controllers/Admin/InsumoController.php:62
* @route '/admin/insumos/{insumo}'
*/
update.patch = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::update
* @see Http/Controllers/Admin/InsumoController.php:62
* @route '/admin/insumos/{insumo}'
*/
const updateForm = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::update
* @see Http/Controllers/Admin/InsumoController.php:62
* @route '/admin/insumos/{insumo}'
*/
updateForm.put = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::update
* @see Http/Controllers/Admin/InsumoController.php:62
* @route '/admin/insumos/{insumo}'
*/
updateForm.patch = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\InsumoController::destroy
* @see Http/Controllers/Admin/InsumoController.php:100
* @route '/admin/insumos/{insumo}'
*/
export const destroy = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/insumos/{insumo}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\InsumoController::destroy
* @see Http/Controllers/Admin/InsumoController.php:100
* @route '/admin/insumos/{insumo}'
*/
destroy.url = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { insumo: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { insumo: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            insumo: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        insumo: typeof args.insumo === 'object'
        ? args.insumo.id
        : args.insumo,
    }

    return destroy.definition.url
            .replace('{insumo}', parsedArgs.insumo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InsumoController::destroy
* @see Http/Controllers/Admin/InsumoController.php:100
* @route '/admin/insumos/{insumo}'
*/
destroy.delete = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::destroy
* @see Http/Controllers/Admin/InsumoController.php:100
* @route '/admin/insumos/{insumo}'
*/
const destroyForm = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InsumoController::destroy
* @see Http/Controllers/Admin/InsumoController.php:100
* @route '/admin/insumos/{insumo}'
*/
destroyForm.delete = (args: { insumo: string | number | { id: string | number } } | [insumo: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const InsumoController = { ajustarStock, index, create, store, show, edit, update, destroy }

export default InsumoController