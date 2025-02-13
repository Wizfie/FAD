import './index.css'
import { createApp } from 'vue'
import axios from 'axios' // Mengimpor Axios
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Menambahkan Axios instance ke global properties
const baseURL = import.meta.env.VITE_API_BASE_URL_IP;
axios.defaults.baseURL = baseURL;
app.use(createPinia)
app.use(router)

app.mount('#app')
