export const routes = [
    {path: '/', component: () => import('./views/HomeView.vue'), name: 'home'},
    {path: '/login', component: () => import('./views/Auth/LoginView.vue'), name: 'login'},
    {path: '/register', component: () => import('./views/Auth/RegisterView.vue'), name: 'register'},
    {path: '/dashboard', component: () => import('./views/Dashboard/DashboardView.vue'), name: 'dashboard'},
]
