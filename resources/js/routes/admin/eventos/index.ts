import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import inscripciones from './inscripciones'
/**
* @see \App\Http\Controllers\Admin\EventoController::inscriptos
* @see app/Http/Controllers/Admin/EventoController.php:120
* @route '/admin/eventos/{evento}/inscriptos'
*/
export const inscriptos = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inscriptos.url(args, options),
    method: 'get',
})

inscriptos.definition = {
    methods: ["get","head"],
    url: '/admin/eventos/{evento}/inscriptos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EventoController::inscriptos
* @see app/Http/Controllers/Admin/EventoController.php:120
* @route '/admin/eventos/{evento}/inscriptos'
*/
inscriptos.url = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evento: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { evento: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            evento: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        evento: typeof args.evento === 'object'
        ? args.evento.id
        : args.evento,
    }

    return inscriptos.definition.url
            .replace('{evento}', parsedArgs.evento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventoController::inscriptos
* @see app/Http/Controllers/Admin/EventoController.php:120
* @route '/admin/eventos/{evento}/inscriptos'
*/
inscriptos.get = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inscriptos.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::inscriptos
* @see app/Http/Controllers/Admin/EventoController.php:120
* @route '/admin/eventos/{evento}/inscriptos'
*/
inscriptos.head = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: inscriptos.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::inscriptos
* @see app/Http/Controllers/Admin/EventoController.php:120
* @route '/admin/eventos/{evento}/inscriptos'
*/
const inscriptosForm = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: inscriptos.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::inscriptos
* @see app/Http/Controllers/Admin/EventoController.php:120
* @route '/admin/eventos/{evento}/inscriptos'
*/
inscriptosForm.get = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: inscriptos.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::inscriptos
* @see app/Http/Controllers/Admin/EventoController.php:120
* @route '/admin/eventos/{evento}/inscriptos'
*/
inscriptosForm.head = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: inscriptos.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

inscriptos.form = inscriptosForm

/**
* @see \App\Http\Controllers\Admin\EventoController::index
* @see app/Http/Controllers/Admin/EventoController.php:19
* @route '/admin/eventos'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/eventos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EventoController::index
* @see app/Http/Controllers/Admin/EventoController.php:19
* @route '/admin/eventos'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventoController::index
* @see app/Http/Controllers/Admin/EventoController.php:19
* @route '/admin/eventos'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::index
* @see app/Http/Controllers/Admin/EventoController.php:19
* @route '/admin/eventos'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::index
* @see app/Http/Controllers/Admin/EventoController.php:19
* @route '/admin/eventos'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::index
* @see app/Http/Controllers/Admin/EventoController.php:19
* @route '/admin/eventos'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::index
* @see app/Http/Controllers/Admin/EventoController.php:19
* @route '/admin/eventos'
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
* @see \App\Http\Controllers\Admin\EventoController::create
* @see app/Http/Controllers/Admin/EventoController.php:40
* @route '/admin/eventos/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/eventos/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EventoController::create
* @see app/Http/Controllers/Admin/EventoController.php:40
* @route '/admin/eventos/create'
*/
create.url = (options?: RouteQueryOptions) => {




    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventoController::create
* @see app/Http/Controllers/Admin/EventoController.php:40
* @route '/admin/eventos/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::create
* @see app/Http/Controllers/Admin/EventoController.php:40
* @route '/admin/eventos/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::create
* @see app/Http/Controllers/Admin/EventoController.php:40
* @route '/admin/eventos/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::create
* @see app/Http/Controllers/Admin/EventoController.php:40
* @route '/admin/eventos/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::create
* @see app/Http/Controllers/Admin/EventoController.php:40
* @route '/admin/eventos/create'
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
* @see \App\Http\Controllers\Admin\EventoController::store
* @see app/Http/Controllers/Admin/EventoController.php:48
* @route '/admin/eventos'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/eventos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EventoController::store
* @see app/Http/Controllers/Admin/EventoController.php:48
* @route '/admin/eventos'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventoController::store
* @see app/Http/Controllers/Admin/EventoController.php:48
* @route '/admin/eventos'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::store
* @see app/Http/Controllers/Admin/EventoController.php:48
* @route '/admin/eventos'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::store
* @see app/Http/Controllers/Admin/EventoController.php:48
* @route '/admin/eventos'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\EventoController::show
* @see app/Http/Controllers/Admin/EventoController.php:0
* @route '/admin/eventos/{evento}'
*/
export const show = (args: { evento: string | number } | [evento: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/eventos/{evento}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EventoController::show
* @see app/Http/Controllers/Admin/EventoController.php:0
* @route '/admin/eventos/{evento}'
*/
show.url = (args: { evento: string | number } | [evento: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evento: args }
    }


    if (Array.isArray(args)) {
        args = {
            evento: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        evento: args.evento,
    }

    return show.definition.url
            .replace('{evento}', parsedArgs.evento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventoController::show
* @see app/Http/Controllers/Admin/EventoController.php:0
* @route '/admin/eventos/{evento}'
*/
show.get = (args: { evento: string | number } | [evento: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::show
* @see app/Http/Controllers/Admin/EventoController.php:0
* @route '/admin/eventos/{evento}'
*/
show.head = (args: { evento: string | number } | [evento: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::show
* @see app/Http/Controllers/Admin/EventoController.php:0
* @route '/admin/eventos/{evento}'
*/
const showForm = (args: { evento: string | number } | [evento: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::show
* @see app/Http/Controllers/Admin/EventoController.php:0
* @route '/admin/eventos/{evento}'
*/
showForm.get = (args: { evento: string | number } | [evento: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::show
* @see app/Http/Controllers/Admin/EventoController.php:0
* @route '/admin/eventos/{evento}'
*/
showForm.head = (args: { evento: string | number } | [evento: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\EventoController::edit
* @see app/Http/Controllers/Admin/EventoController.php:77
* @route '/admin/eventos/{evento}/edit'
*/
export const edit = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/eventos/{evento}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EventoController::edit
* @see app/Http/Controllers/Admin/EventoController.php:77
* @route '/admin/eventos/{evento}/edit'
*/
edit.url = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evento: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { evento: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            evento: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        evento: typeof args.evento === 'object'
        ? args.evento.id
        : args.evento,
    }

    return edit.definition.url
            .replace('{evento}', parsedArgs.evento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventoController::edit
* @see app/Http/Controllers/Admin/EventoController.php:77
* @route '/admin/eventos/{evento}/edit'
*/
edit.get = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::edit
* @see app/Http/Controllers/Admin/EventoController.php:77
* @route '/admin/eventos/{evento}/edit'
*/
edit.head = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::edit
* @see app/Http/Controllers/Admin/EventoController.php:77
* @route '/admin/eventos/{evento}/edit'
*/
const editForm = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::edit
* @see app/Http/Controllers/Admin/EventoController.php:77
* @route '/admin/eventos/{evento}/edit'
*/
editForm.get = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::edit
* @see app/Http/Controllers/Admin/EventoController.php:77
* @route '/admin/eventos/{evento}/edit'
*/
editForm.head = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\EventoController::update
* @see app/Http/Controllers/Admin/EventoController.php:87
* @route '/admin/eventos/{evento}'
*/
export const update = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/eventos/{evento}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\EventoController::update
* @see app/Http/Controllers/Admin/EventoController.php:87
* @route '/admin/eventos/{evento}'
*/
update.url = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evento: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { evento: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            evento: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        evento: typeof args.evento === 'object'
        ? args.evento.id
        : args.evento,
    }

    return update.definition.url
            .replace('{evento}', parsedArgs.evento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventoController::update
* @see app/Http/Controllers/Admin/EventoController.php:87
* @route '/admin/eventos/{evento}'
*/
update.put = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::update
* @see app/Http/Controllers/Admin/EventoController.php:87
* @route '/admin/eventos/{evento}'
*/
update.patch = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::update
* @see app/Http/Controllers/Admin/EventoController.php:87
* @route '/admin/eventos/{evento}'
*/
const updateForm = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::update
* @see app/Http/Controllers/Admin/EventoController.php:87
* @route '/admin/eventos/{evento}'
*/
updateForm.put = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::update
* @see app/Http/Controllers/Admin/EventoController.php:87
* @route '/admin/eventos/{evento}'
*/
updateForm.patch = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\EventoController::destroy
* @see app/Http/Controllers/Admin/EventoController.php:149
* @route '/admin/eventos/{evento}'
*/
export const destroy = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/eventos/{evento}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\EventoController::destroy
* @see app/Http/Controllers/Admin/EventoController.php:149
* @route '/admin/eventos/{evento}'
*/
destroy.url = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evento: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { evento: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            evento: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        evento: typeof args.evento === 'object'
        ? args.evento.id
        : args.evento,
    }

    return destroy.definition.url
            .replace('{evento}', parsedArgs.evento.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventoController::destroy
* @see app/Http/Controllers/Admin/EventoController.php:149
* @route '/admin/eventos/{evento}'
*/
destroy.delete = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::destroy
* @see app/Http/Controllers/Admin/EventoController.php:149
* @route '/admin/eventos/{evento}'
*/
const destroyForm = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EventoController::destroy
* @see app/Http/Controllers/Admin/EventoController.php:149
* @route '/admin/eventos/{evento}'
*/
destroyForm.delete = (args: { evento: number | { id: number } } | [evento: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm



const eventos = {
    inscriptos: Object.assign(inscriptos, inscriptos),
    inscripciones: Object.assign(inscripciones, inscripciones),
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default eventos