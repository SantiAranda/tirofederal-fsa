import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\MembresiaController::index
* @see Http/Controllers/Admin/MembresiaController.php:18
* @route '/admin/membresias'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/membresias',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MembresiaController::index
* @see Http/Controllers/Admin/MembresiaController.php:18
* @route '/admin/membresias'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MembresiaController::index
* @see Http/Controllers/Admin/MembresiaController.php:18
* @route '/admin/membresias'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::index
* @see Http/Controllers/Admin/MembresiaController.php:18
* @route '/admin/membresias'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::index
* @see Http/Controllers/Admin/MembresiaController.php:18
* @route '/admin/membresias'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::index
* @see Http/Controllers/Admin/MembresiaController.php:18
* @route '/admin/membresias'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::index
* @see Http/Controllers/Admin/MembresiaController.php:18
* @route '/admin/membresias'
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
* @see \App\Http\Controllers\Admin\MembresiaController::create
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/membresias/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MembresiaController::create
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MembresiaController::create
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::create
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::create
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::create
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::create
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/create'
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
* @see \App\Http\Controllers\Admin\MembresiaController::store
* @see Http/Controllers/Admin/MembresiaController.php:32
* @route '/admin/membresias'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/membresias',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\MembresiaController::store
* @see Http/Controllers/Admin/MembresiaController.php:32
* @route '/admin/membresias'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MembresiaController::store
* @see Http/Controllers/Admin/MembresiaController.php:32
* @route '/admin/membresias'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::store
* @see Http/Controllers/Admin/MembresiaController.php:32
* @route '/admin/membresias'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::store
* @see Http/Controllers/Admin/MembresiaController.php:32
* @route '/admin/membresias'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\MembresiaController::show
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/{membresia}'
*/
export const show = (args: { membresia: string | number } | [membresia: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/membresias/{membresia}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MembresiaController::show
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/{membresia}'
*/
show.url = (args: { membresia: string | number } | [membresia: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { membresia: args }
    }

    if (Array.isArray(args)) {
        args = {
            membresia: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        membresia: args.membresia,
    }

    return show.definition.url
            .replace('{membresia}', parsedArgs.membresia.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MembresiaController::show
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/{membresia}'
*/
show.get = (args: { membresia: string | number } | [membresia: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::show
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/{membresia}'
*/
show.head = (args: { membresia: string | number } | [membresia: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::show
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/{membresia}'
*/
const showForm = (args: { membresia: string | number } | [membresia: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::show
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/{membresia}'
*/
showForm.get = (args: { membresia: string | number } | [membresia: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::show
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/{membresia}'
*/
showForm.head = (args: { membresia: string | number } | [membresia: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\MembresiaController::edit
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/{membresia}/edit'
*/
export const edit = (args: { membresia: string | number } | [membresia: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/membresias/{membresia}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MembresiaController::edit
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/{membresia}/edit'
*/
edit.url = (args: { membresia: string | number } | [membresia: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { membresia: args }
    }

    if (Array.isArray(args)) {
        args = {
            membresia: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        membresia: args.membresia,
    }

    return edit.definition.url
            .replace('{membresia}', parsedArgs.membresia.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MembresiaController::edit
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/{membresia}/edit'
*/
edit.get = (args: { membresia: string | number } | [membresia: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::edit
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/{membresia}/edit'
*/
edit.head = (args: { membresia: string | number } | [membresia: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::edit
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/{membresia}/edit'
*/
const editForm = (args: { membresia: string | number } | [membresia: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::edit
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/{membresia}/edit'
*/
editForm.get = (args: { membresia: string | number } | [membresia: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::edit
* @see Http/Controllers/Admin/MembresiaController.php:0
* @route '/admin/membresias/{membresia}/edit'
*/
editForm.head = (args: { membresia: string | number } | [membresia: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\MembresiaController::update
* @see Http/Controllers/Admin/MembresiaController.php:56
* @route '/admin/membresias/{membresia}'
*/
export const update = (args: { membresia: string | number | { id: string | number } } | [membresia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/membresias/{membresia}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\MembresiaController::update
* @see Http/Controllers/Admin/MembresiaController.php:56
* @route '/admin/membresias/{membresia}'
*/
update.url = (args: { membresia: string | number | { id: string | number } } | [membresia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { membresia: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { membresia: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            membresia: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        membresia: typeof args.membresia === 'object'
        ? args.membresia.id
        : args.membresia,
    }

    return update.definition.url
            .replace('{membresia}', parsedArgs.membresia.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MembresiaController::update
* @see Http/Controllers/Admin/MembresiaController.php:56
* @route '/admin/membresias/{membresia}'
*/
update.put = (args: { membresia: string | number | { id: string | number } } | [membresia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::update
* @see Http/Controllers/Admin/MembresiaController.php:56
* @route '/admin/membresias/{membresia}'
*/
update.patch = (args: { membresia: string | number | { id: string | number } } | [membresia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::update
* @see Http/Controllers/Admin/MembresiaController.php:56
* @route '/admin/membresias/{membresia}'
*/
const updateForm = (args: { membresia: string | number | { id: string | number } } | [membresia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::update
* @see Http/Controllers/Admin/MembresiaController.php:56
* @route '/admin/membresias/{membresia}'
*/
updateForm.put = (args: { membresia: string | number | { id: string | number } } | [membresia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::update
* @see Http/Controllers/Admin/MembresiaController.php:56
* @route '/admin/membresias/{membresia}'
*/
updateForm.patch = (args: { membresia: string | number | { id: string | number } } | [membresia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\MembresiaController::destroy
* @see Http/Controllers/Admin/MembresiaController.php:79
* @route '/admin/membresias/{membresia}'
*/
export const destroy = (args: { membresia: string | number | { id: string | number } } | [membresia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/membresias/{membresia}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\MembresiaController::destroy
* @see Http/Controllers/Admin/MembresiaController.php:79
* @route '/admin/membresias/{membresia}'
*/
destroy.url = (args: { membresia: string | number | { id: string | number } } | [membresia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { membresia: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { membresia: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            membresia: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        membresia: typeof args.membresia === 'object'
        ? args.membresia.id
        : args.membresia,
    }

    return destroy.definition.url
            .replace('{membresia}', parsedArgs.membresia.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MembresiaController::destroy
* @see Http/Controllers/Admin/MembresiaController.php:79
* @route '/admin/membresias/{membresia}'
*/
destroy.delete = (args: { membresia: string | number | { id: string | number } } | [membresia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::destroy
* @see Http/Controllers/Admin/MembresiaController.php:79
* @route '/admin/membresias/{membresia}'
*/
const destroyForm = (args: { membresia: string | number | { id: string | number } } | [membresia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\MembresiaController::destroy
* @see Http/Controllers/Admin/MembresiaController.php:79
* @route '/admin/membresias/{membresia}'
*/
destroyForm.delete = (args: { membresia: string | number | { id: string | number } } | [membresia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const membresias = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default membresias