import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PagoController::descargarPdf
* @see Http/Controllers/Admin/PagoController.php:102
* @route '/admin/pagos/{pago}/pdf'
*/
export const descargarPdf = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: descargarPdf.url(args, options),
    method: 'get',
})

descargarPdf.definition = {
    methods: ["get","head"],
    url: '/admin/pagos/{pago}/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PagoController::descargarPdf
* @see Http/Controllers/Admin/PagoController.php:102
* @route '/admin/pagos/{pago}/pdf'
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
* @see \App\Http\Controllers\Admin\PagoController::descargarPdf
* @see Http/Controllers/Admin/PagoController.php:102
* @route '/admin/pagos/{pago}/pdf'
*/
descargarPdf.get = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: descargarPdf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::descargarPdf
* @see Http/Controllers/Admin/PagoController.php:102
* @route '/admin/pagos/{pago}/pdf'
*/
descargarPdf.head = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: descargarPdf.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::descargarPdf
* @see Http/Controllers/Admin/PagoController.php:102
* @route '/admin/pagos/{pago}/pdf'
*/
const descargarPdfForm = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: descargarPdf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::descargarPdf
* @see Http/Controllers/Admin/PagoController.php:102
* @route '/admin/pagos/{pago}/pdf'
*/
descargarPdfForm.get = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: descargarPdf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::descargarPdf
* @see Http/Controllers/Admin/PagoController.php:102
* @route '/admin/pagos/{pago}/pdf'
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

/**
* @see \App\Http\Controllers\Admin\PagoController::anular
* @see Http/Controllers/Admin/PagoController.php:119
* @route '/admin/pagos/{pago}/anular'
*/
export const anular = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: anular.url(args, options),
    method: 'patch',
})

anular.definition = {
    methods: ["patch"],
    url: '/admin/pagos/{pago}/anular',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\PagoController::anular
* @see Http/Controllers/Admin/PagoController.php:119
* @route '/admin/pagos/{pago}/anular'
*/
anular.url = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return anular.definition.url
            .replace('{pago}', parsedArgs.pago.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PagoController::anular
* @see Http/Controllers/Admin/PagoController.php:119
* @route '/admin/pagos/{pago}/anular'
*/
anular.patch = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: anular.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::anular
* @see Http/Controllers/Admin/PagoController.php:119
* @route '/admin/pagos/{pago}/anular'
*/
const anularForm = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: anular.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::anular
* @see Http/Controllers/Admin/PagoController.php:119
* @route '/admin/pagos/{pago}/anular'
*/
anularForm.patch = (args: { pago: string | number | { id: string | number } } | [pago: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: anular.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

anular.form = anularForm

/**
* @see \App\Http\Controllers\Admin\PagoController::index
* @see Http/Controllers/Admin/PagoController.php:22
* @route '/admin/pagos'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/pagos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PagoController::index
* @see Http/Controllers/Admin/PagoController.php:22
* @route '/admin/pagos'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PagoController::index
* @see Http/Controllers/Admin/PagoController.php:22
* @route '/admin/pagos'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::index
* @see Http/Controllers/Admin/PagoController.php:22
* @route '/admin/pagos'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::index
* @see Http/Controllers/Admin/PagoController.php:22
* @route '/admin/pagos'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::index
* @see Http/Controllers/Admin/PagoController.php:22
* @route '/admin/pagos'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::index
* @see Http/Controllers/Admin/PagoController.php:22
* @route '/admin/pagos'
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
* @see \App\Http\Controllers\Admin\PagoController::create
* @see Http/Controllers/Admin/PagoController.php:63
* @route '/admin/pagos/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/pagos/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PagoController::create
* @see Http/Controllers/Admin/PagoController.php:63
* @route '/admin/pagos/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PagoController::create
* @see Http/Controllers/Admin/PagoController.php:63
* @route '/admin/pagos/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::create
* @see Http/Controllers/Admin/PagoController.php:63
* @route '/admin/pagos/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::create
* @see Http/Controllers/Admin/PagoController.php:63
* @route '/admin/pagos/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::create
* @see Http/Controllers/Admin/PagoController.php:63
* @route '/admin/pagos/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::create
* @see Http/Controllers/Admin/PagoController.php:63
* @route '/admin/pagos/create'
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
* @see \App\Http\Controllers\Admin\PagoController::store
* @see Http/Controllers/Admin/PagoController.php:77
* @route '/admin/pagos'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/pagos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PagoController::store
* @see Http/Controllers/Admin/PagoController.php:77
* @route '/admin/pagos'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PagoController::store
* @see Http/Controllers/Admin/PagoController.php:77
* @route '/admin/pagos'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::store
* @see Http/Controllers/Admin/PagoController.php:77
* @route '/admin/pagos'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::store
* @see Http/Controllers/Admin/PagoController.php:77
* @route '/admin/pagos'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\PagoController::show
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
export const show = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/pagos/{pago}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PagoController::show
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
show.url = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pago: args }
    }

    if (Array.isArray(args)) {
        args = {
            pago: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pago: args.pago,
    }

    return show.definition.url
            .replace('{pago}', parsedArgs.pago.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PagoController::show
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
show.get = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::show
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
show.head = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::show
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
const showForm = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::show
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
showForm.get = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::show
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
showForm.head = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\PagoController::edit
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}/edit'
*/
export const edit = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/pagos/{pago}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PagoController::edit
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}/edit'
*/
edit.url = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pago: args }
    }

    if (Array.isArray(args)) {
        args = {
            pago: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pago: args.pago,
    }

    return edit.definition.url
            .replace('{pago}', parsedArgs.pago.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PagoController::edit
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}/edit'
*/
edit.get = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::edit
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}/edit'
*/
edit.head = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::edit
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}/edit'
*/
const editForm = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::edit
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}/edit'
*/
editForm.get = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::edit
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}/edit'
*/
editForm.head = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\PagoController::update
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
export const update = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/pagos/{pago}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\PagoController::update
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
update.url = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pago: args }
    }

    if (Array.isArray(args)) {
        args = {
            pago: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pago: args.pago,
    }

    return update.definition.url
            .replace('{pago}', parsedArgs.pago.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PagoController::update
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
update.put = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::update
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
update.patch = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::update
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
const updateForm = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::update
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
updateForm.put = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::update
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
updateForm.patch = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\PagoController::destroy
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
export const destroy = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/pagos/{pago}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PagoController::destroy
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
destroy.url = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pago: args }
    }

    if (Array.isArray(args)) {
        args = {
            pago: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pago: args.pago,
    }

    return destroy.definition.url
            .replace('{pago}', parsedArgs.pago.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PagoController::destroy
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
destroy.delete = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::destroy
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
const destroyForm = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PagoController::destroy
* @see Http/Controllers/Admin/PagoController.php:0
* @route '/admin/pagos/{pago}'
*/
destroyForm.delete = (args: { pago: string | number } | [pago: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const PagoController = { descargarPdf, anular, index, create, store, show, edit, update, destroy }

export default PagoController