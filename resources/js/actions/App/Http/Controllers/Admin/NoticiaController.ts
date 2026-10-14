import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\NoticiaController::index
* @see Http/Controllers/Admin/NoticiaController.php:19
* @route '/admin/noticias'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/noticias',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NoticiaController::index
* @see Http/Controllers/Admin/NoticiaController.php:19
* @route '/admin/noticias'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NoticiaController::index
* @see Http/Controllers/Admin/NoticiaController.php:19
* @route '/admin/noticias'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::index
* @see Http/Controllers/Admin/NoticiaController.php:19
* @route '/admin/noticias'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::index
* @see Http/Controllers/Admin/NoticiaController.php:19
* @route '/admin/noticias'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::index
* @see Http/Controllers/Admin/NoticiaController.php:19
* @route '/admin/noticias'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::index
* @see Http/Controllers/Admin/NoticiaController.php:19
* @route '/admin/noticias'
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
* @see \App\Http\Controllers\Admin\NoticiaController::create
* @see Http/Controllers/Admin/NoticiaController.php:33
* @route '/admin/noticias/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/noticias/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NoticiaController::create
* @see Http/Controllers/Admin/NoticiaController.php:33
* @route '/admin/noticias/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NoticiaController::create
* @see Http/Controllers/Admin/NoticiaController.php:33
* @route '/admin/noticias/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::create
* @see Http/Controllers/Admin/NoticiaController.php:33
* @route '/admin/noticias/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::create
* @see Http/Controllers/Admin/NoticiaController.php:33
* @route '/admin/noticias/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::create
* @see Http/Controllers/Admin/NoticiaController.php:33
* @route '/admin/noticias/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::create
* @see Http/Controllers/Admin/NoticiaController.php:33
* @route '/admin/noticias/create'
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
* @see \App\Http\Controllers\Admin\NoticiaController::store
* @see Http/Controllers/Admin/NoticiaController.php:41
* @route '/admin/noticias'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/noticias',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\NoticiaController::store
* @see Http/Controllers/Admin/NoticiaController.php:41
* @route '/admin/noticias'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NoticiaController::store
* @see Http/Controllers/Admin/NoticiaController.php:41
* @route '/admin/noticias'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::store
* @see Http/Controllers/Admin/NoticiaController.php:41
* @route '/admin/noticias'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::store
* @see Http/Controllers/Admin/NoticiaController.php:41
* @route '/admin/noticias'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\NoticiaController::show
* @see Http/Controllers/Admin/NoticiaController.php:0
* @route '/admin/noticias/{noticia}'
*/
export const show = (args: { noticia: string | number } | [noticia: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/noticias/{noticia}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NoticiaController::show
* @see Http/Controllers/Admin/NoticiaController.php:0
* @route '/admin/noticias/{noticia}'
*/
show.url = (args: { noticia: string | number } | [noticia: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noticia: args }
    }

    if (Array.isArray(args)) {
        args = {
            noticia: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noticia: args.noticia,
    }

    return show.definition.url
            .replace('{noticia}', parsedArgs.noticia.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NoticiaController::show
* @see Http/Controllers/Admin/NoticiaController.php:0
* @route '/admin/noticias/{noticia}'
*/
show.get = (args: { noticia: string | number } | [noticia: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::show
* @see Http/Controllers/Admin/NoticiaController.php:0
* @route '/admin/noticias/{noticia}'
*/
show.head = (args: { noticia: string | number } | [noticia: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::show
* @see Http/Controllers/Admin/NoticiaController.php:0
* @route '/admin/noticias/{noticia}'
*/
const showForm = (args: { noticia: string | number } | [noticia: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::show
* @see Http/Controllers/Admin/NoticiaController.php:0
* @route '/admin/noticias/{noticia}'
*/
showForm.get = (args: { noticia: string | number } | [noticia: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::show
* @see Http/Controllers/Admin/NoticiaController.php:0
* @route '/admin/noticias/{noticia}'
*/
showForm.head = (args: { noticia: string | number } | [noticia: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\NoticiaController::edit
* @see Http/Controllers/Admin/NoticiaController.php:80
* @route '/admin/noticias/{noticia}/edit'
*/
export const edit = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/noticias/{noticia}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NoticiaController::edit
* @see Http/Controllers/Admin/NoticiaController.php:80
* @route '/admin/noticias/{noticia}/edit'
*/
edit.url = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noticia: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { noticia: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            noticia: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noticia: typeof args.noticia === 'object'
        ? args.noticia.id
        : args.noticia,
    }

    return edit.definition.url
            .replace('{noticia}', parsedArgs.noticia.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NoticiaController::edit
* @see Http/Controllers/Admin/NoticiaController.php:80
* @route '/admin/noticias/{noticia}/edit'
*/
edit.get = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::edit
* @see Http/Controllers/Admin/NoticiaController.php:80
* @route '/admin/noticias/{noticia}/edit'
*/
edit.head = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::edit
* @see Http/Controllers/Admin/NoticiaController.php:80
* @route '/admin/noticias/{noticia}/edit'
*/
const editForm = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::edit
* @see Http/Controllers/Admin/NoticiaController.php:80
* @route '/admin/noticias/{noticia}/edit'
*/
editForm.get = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::edit
* @see Http/Controllers/Admin/NoticiaController.php:80
* @route '/admin/noticias/{noticia}/edit'
*/
editForm.head = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\NoticiaController::update
* @see Http/Controllers/Admin/NoticiaController.php:90
* @route '/admin/noticias/{noticia}'
*/
export const update = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/noticias/{noticia}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\NoticiaController::update
* @see Http/Controllers/Admin/NoticiaController.php:90
* @route '/admin/noticias/{noticia}'
*/
update.url = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noticia: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { noticia: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            noticia: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noticia: typeof args.noticia === 'object'
        ? args.noticia.id
        : args.noticia,
    }

    return update.definition.url
            .replace('{noticia}', parsedArgs.noticia.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NoticiaController::update
* @see Http/Controllers/Admin/NoticiaController.php:90
* @route '/admin/noticias/{noticia}'
*/
update.put = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::update
* @see Http/Controllers/Admin/NoticiaController.php:90
* @route '/admin/noticias/{noticia}'
*/
update.patch = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::update
* @see Http/Controllers/Admin/NoticiaController.php:90
* @route '/admin/noticias/{noticia}'
*/
const updateForm = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::update
* @see Http/Controllers/Admin/NoticiaController.php:90
* @route '/admin/noticias/{noticia}'
*/
updateForm.put = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::update
* @see Http/Controllers/Admin/NoticiaController.php:90
* @route '/admin/noticias/{noticia}'
*/
updateForm.patch = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\NoticiaController::destroy
* @see Http/Controllers/Admin/NoticiaController.php:135
* @route '/admin/noticias/{noticia}'
*/
export const destroy = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/noticias/{noticia}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\NoticiaController::destroy
* @see Http/Controllers/Admin/NoticiaController.php:135
* @route '/admin/noticias/{noticia}'
*/
destroy.url = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { noticia: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { noticia: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            noticia: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        noticia: typeof args.noticia === 'object'
        ? args.noticia.id
        : args.noticia,
    }

    return destroy.definition.url
            .replace('{noticia}', parsedArgs.noticia.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NoticiaController::destroy
* @see Http/Controllers/Admin/NoticiaController.php:135
* @route '/admin/noticias/{noticia}'
*/
destroy.delete = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::destroy
* @see Http/Controllers/Admin/NoticiaController.php:135
* @route '/admin/noticias/{noticia}'
*/
const destroyForm = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\NoticiaController::destroy
* @see Http/Controllers/Admin/NoticiaController.php:135
* @route '/admin/noticias/{noticia}'
*/
destroyForm.delete = (args: { noticia: string | number | { id: string | number } } | [noticia: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const NoticiaController = { index, create, store, show, edit, update, destroy }

export default NoticiaController