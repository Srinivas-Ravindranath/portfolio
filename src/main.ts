import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

if (
  navigator.userAgent.includes('Safari') &&
  !navigator.userAgent.includes('Chrome')
  // !navigator.userAgent.includes('CriOS')
) {
  document.body.classList.add('safari')
}

const ua = navigator.userAgent;

// Is this a mobile device?
const isMobile = /Mobi|Android|iPhone|iPod|iPad/i.test(ua);

// Is this Chrome or iOS Chrome (CriOS)?
const isChrome = /Chrome|CriOS/i.test(ua);

if (isMobile && isChrome) {
  document.body.classList.add('chrome-phone');
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
