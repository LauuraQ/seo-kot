// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TextGen from '../views/TextGen.vue'
import WordChek from '../views/WordCheck.vue'
import Contact from '../views/Contact.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/text-gen',
        name: 'TextGen',
        component: TextGen
    },
    {
        path: '/word-checker',
        name: 'WordCheck',
        component: WordChek
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router