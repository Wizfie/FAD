import './index.css'
import { createApp } from 'vue'
import axios from 'axios' // Mengimpor Axios
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
// Konfigurasi Axios langsung di sini

// Menambahkan Axios instance ke global properties
axios.defaults.baseURL = 'http://localhost:5000'
app.use(createPinia())
app.use(router)

app.mount('#app')
