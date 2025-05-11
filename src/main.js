import {createApp} from 'vue'

import {createRouter, createWebHistory} from "vue-router";
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import App from './App.vue'
import './index.css'
import {routes} from './routes.js'

import {apiService} from './apiService.js'

const router = createRouter({
    routes: routes,
    history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.use(ToastPlugin)
app.use(apiService)
app.mount('#app')