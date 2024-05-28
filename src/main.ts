import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import en from './locales/en.json'
import es from './locales/es.json'
import ja from './locales/ja.json'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaExternalLinkAlt } from 'oh-vue-icons/icons'

// Configure i18n
const i18n = createI18n({
  legacy: false, // Setting legacy to false for Composition API support
  locale: 'en', // Default locale
  fallbackLocale: 'en', // Fallback locale
  messages: {
    en,
    es,
    ja
  }
})

// Add icons
addIcons(FaExternalLinkAlt)

const app = createApp(App)

// Use plugins
app.use(i18n)
app.use(router)

// Register global components
app.component('v-icon', OhVueIcon)

app.mount('#app')
