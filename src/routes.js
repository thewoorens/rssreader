export const routes = [
    {path: '/', component: () => import('./views/HomeView.vue')},
    {path: '/login', component: () => import('./views/Auth/LoginComponent.vue')},
    {path: '/register', component: () => import('./views/Auth/RegisterComponent.vue')},
]
