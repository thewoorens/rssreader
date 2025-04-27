export const routes = [
    {path: '/', component: () => import('./views/HomeView.vue'), name: 'home'},
    {path: '/login', component: () => import('./views/Auth/LoginComponent.vue'), name: 'login'},
    {path: '/register', component: () => import('./views/Auth/RegisterComponent.vue'), name: 'register'},
]
