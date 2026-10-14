import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

login.form = loginForm

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

logout.form = logoutForm

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

register.form = registerForm

/**
* @see \App\Http\Controllers\PublicController::home
* @see Http/Controllers/PublicController.php:19
* @route '/'
*/
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::home
* @see Http/Controllers/PublicController.php:19
* @route '/'
*/
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::home
* @see Http/Controllers/PublicController.php:19
* @route '/'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::home
* @see Http/Controllers/PublicController.php:19
* @route '/'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::home
* @see Http/Controllers/PublicController.php:19
* @route '/'
*/
const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::home
* @see Http/Controllers/PublicController.php:19
* @route '/'
*/
homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::home
* @see Http/Controllers/PublicController.php:19
* @route '/'
*/
homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

home.form = homeForm

/**
* @see \App\Http\Controllers\PublicController::historia
* @see Http/Controllers/PublicController.php:48
* @route '/historia'
*/
export const historia = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: historia.url(options),
    method: 'get',
})

historia.definition = {
    methods: ["get","head"],
    url: '/historia',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::historia
* @see Http/Controllers/PublicController.php:48
* @route '/historia'
*/
historia.url = (options?: RouteQueryOptions) => {
    return historia.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::historia
* @see Http/Controllers/PublicController.php:48
* @route '/historia'
*/
historia.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: historia.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::historia
* @see Http/Controllers/PublicController.php:48
* @route '/historia'
*/
historia.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: historia.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::historia
* @see Http/Controllers/PublicController.php:48
* @route '/historia'
*/
const historiaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: historia.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::historia
* @see Http/Controllers/PublicController.php:48
* @route '/historia'
*/
historiaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: historia.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::historia
* @see Http/Controllers/PublicController.php:48
* @route '/historia'
*/
historiaForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: historia.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

historia.form = historiaForm

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
export const disciplinas = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: disciplinas.url(options),
    method: 'get',
})

disciplinas.definition = {
    methods: ["get","head"],
    url: '/disciplinas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
disciplinas.url = (options?: RouteQueryOptions) => {
    return disciplinas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
disciplinas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: disciplinas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
disciplinas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: disciplinas.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
const disciplinasForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: disciplinas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
disciplinasForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: disciplinas.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::disciplinas
* @see Http/Controllers/PublicController.php:60
* @route '/disciplinas'
*/
disciplinasForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: disciplinas.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

disciplinas.form = disciplinasForm

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
export const decalogo = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: decalogo.url(options),
    method: 'get',
})

decalogo.definition = {
    methods: ["get","head"],
    url: '/decalogo',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
decalogo.url = (options?: RouteQueryOptions) => {
    return decalogo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
decalogo.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: decalogo.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
decalogo.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: decalogo.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
const decalogoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: decalogo.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
decalogoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: decalogo.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicController::decalogo
* @see Http/Controllers/PublicController.php:86
* @route '/decalogo'
*/
decalogoForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: decalogo.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

decalogo.form = decalogoForm

/**
* @see routes/web.php:40
* @route '/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:40
* @route '/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see routes/web.php:40
* @route '/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:40
* @route '/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see routes/web.php:40
* @route '/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:40
* @route '/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:40
* @route '/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm
