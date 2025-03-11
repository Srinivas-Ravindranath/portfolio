import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

if (
  navigator.userAgent.includes('Safari') &&
  !navigator.userAgent.includes('Chrome') &&
  !navigator.userAgent.includes('CriOS')
) {
  document.body.classList.add('safari')
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
