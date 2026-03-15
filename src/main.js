import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // подключаем наш роутер

const app = createApp(App)
    .use(router) // регистрируем роутер
    .mount('#app')