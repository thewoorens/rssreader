import {createApp} from 'vue'

import {createRouter, createWebHistory} from "vue-router";

import App from './App.vue'
import './index.css'
import {routes} from './routes.js'

const router = createRouter({
    routes: routes,
    history: createWebHistory()
})

const app = createApp(App)
app.use(router)

app.mount('#app')