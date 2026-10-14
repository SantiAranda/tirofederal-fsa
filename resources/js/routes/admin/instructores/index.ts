import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\InstructorController::index
* @see Http/Controllers/Admin/InstructorController.php:21
* @route '/admin/instructores'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/instructores',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InstructorController::index
* @see Http/Controllers/Admin/InstructorController.php:21
* @route '/admin/instructores'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InstructorController::index
* @see Http/Controllers/Admin/InstructorController.php:21
* @route '/admin/instructores'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::index
* @see Http/Controllers/Admin/InstructorController.php:21
* @route '/admin/instructores'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::index
* @see Http/Controllers/Admin/InstructorController.php:21
* @route '/admin/instructores'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::index
* @see Http/Controllers/Admin/InstructorController.php:21
* @route '/admin/instructores'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::index
* @see Http/Controllers/Admin/InstructorController.php:21
* @route '/admin/instructores'
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
* @see \App\Http\Controllers\Admin\InstructorController::create
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/instructores/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InstructorController::create
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InstructorController::create
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::create
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::create
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::create
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::create
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/create'
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
* @see \App\Http\Controllers\Admin\InstructorController::store
* @see Http/Controllers/Admin/InstructorController.php:36
* @route '/admin/instructores'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/instructores',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InstructorController::store
* @see Http/Controllers/Admin/InstructorController.php:36
* @route '/admin/instructores'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InstructorController::store
* @see Http/Controllers/Admin/InstructorController.php:36
* @route '/admin/instructores'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::store
* @see Http/Controllers/Admin/InstructorController.php:36
* @route '/admin/instructores'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::store
* @see Http/Controllers/Admin/InstructorController.php:36
* @route '/admin/instructores'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\InstructorController::show
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/{instructor}'
*/
export const show = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/instructores/{instructor}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InstructorController::show
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/{instructor}'
*/
show.url = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { instructor: args }
    }

    if (Array.isArray(args)) {
        args = {
            instructor: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        instructor: args.instructor,
    }

    return show.definition.url
            .replace('{instructor}', parsedArgs.instructor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InstructorController::show
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/{instructor}'
*/
show.get = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::show
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/{instructor}'
*/
show.head = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::show
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/{instructor}'
*/
const showForm = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::show
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/{instructor}'
*/
showForm.get = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::show
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/{instructor}'
*/
showForm.head = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\InstructorController::edit
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/{instructor}/edit'
*/
export const edit = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/instructores/{instructor}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InstructorController::edit
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/{instructor}/edit'
*/
edit.url = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { instructor: args }
    }

    if (Array.isArray(args)) {
        args = {
            instructor: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        instructor: args.instructor,
    }

    return edit.definition.url
            .replace('{instructor}', parsedArgs.instructor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InstructorController::edit
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/{instructor}/edit'
*/
edit.get = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::edit
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/{instructor}/edit'
*/
edit.head = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::edit
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/{instructor}/edit'
*/
const editForm = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::edit
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/{instructor}/edit'
*/
editForm.get = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::edit
* @see Http/Controllers/Admin/InstructorController.php:0
* @route '/admin/instructores/{instructor}/edit'
*/
editForm.head = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\InstructorController::update
* @see Http/Controllers/Admin/InstructorController.php:83
* @route '/admin/instructores/{instructor}'
*/
export const update = (args: { instructor: string | number | { id: string | number } } | [instructor: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/instructores/{instructor}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\InstructorController::update
* @see Http/Controllers/Admin/InstructorController.php:83
* @route '/admin/instructores/{instructor}'
*/
update.url = (args: { instructor: string | number | { id: string | number } } | [instructor: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { instructor: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { instructor: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            instructor: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        instructor: typeof args.instructor === 'object'
        ? args.instructor.id
        : args.instructor,
    }

    return update.definition.url
            .replace('{instructor}', parsedArgs.instructor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InstructorController::update
* @see Http/Controllers/Admin/InstructorController.php:83
* @route '/admin/instructores/{instructor}'
*/
update.put = (args: { instructor: string | number | { id: string | number } } | [instructor: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::update
* @see Http/Controllers/Admin/InstructorController.php:83
* @route '/admin/instructores/{instructor}'
*/
update.patch = (args: { instructor: string | number | { id: string | number } } | [instructor: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::update
* @see Http/Controllers/Admin/InstructorController.php:83
* @route '/admin/instructores/{instructor}'
*/
const updateForm = (args: { instructor: string | number | { id: string | number } } | [instructor: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::update
* @see Http/Controllers/Admin/InstructorController.php:83
* @route '/admin/instructores/{instructor}'
*/
updateForm.put = (args: { instructor: string | number | { id: string | number } } | [instructor: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::update
* @see Http/Controllers/Admin/InstructorController.php:83
* @route '/admin/instructores/{instructor}'
*/
updateForm.patch = (args: { instructor: string | number | { id: string | number } } | [instructor: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\InstructorController::destroy
* @see Http/Controllers/Admin/InstructorController.php:126
* @route '/admin/instructores/{instructor}'
*/
export const destroy = (args: { instructor: string | number | { id: string | number } } | [instructor: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/instructores/{instructor}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\InstructorController::destroy
* @see Http/Controllers/Admin/InstructorController.php:126
* @route '/admin/instructores/{instructor}'
*/
destroy.url = (args: { instructor: string | number | { id: string | number } } | [instructor: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { instructor: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { instructor: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            instructor: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        instructor: typeof args.instructor === 'object'
        ? args.instructor.id
        : args.instructor,
    }

    return destroy.definition.url
            .replace('{instructor}', parsedArgs.instructor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InstructorController::destroy
* @see Http/Controllers/Admin/InstructorController.php:126
* @route '/admin/instructores/{instructor}'
*/
destroy.delete = (args: { instructor: string | number | { id: string | number } } | [instructor: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::destroy
* @see Http/Controllers/Admin/InstructorController.php:126
* @route '/admin/instructores/{instructor}'
*/
const destroyForm = (args: { instructor: string | number | { id: string | number } } | [instructor: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InstructorController::destroy
* @see Http/Controllers/Admin/InstructorController.php:126
* @route '/admin/instructores/{instructor}'
*/
destroyForm.delete = (args: { instructor: string | number | { id: string | number } } | [instructor: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const instructores = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default instructores