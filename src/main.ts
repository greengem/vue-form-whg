import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import en from './locales/en.json'
import es from './locales/es.json'
import ja from './locales/ja.json'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaExternalLinkAlt, FaSun, FaMoon, FaAdjust } from 'oh-vue-icons/icons'

// Function to get browser's preferred language
function getBrowserLanguage() {
  const browserLanguages = navigator.languages || [navigator.language]
  const supportedLanguages = ['en', 'es', 'ja']
  // Find the first supported language that matches browser preference
  const browserLanguage =
    browserLanguages.find((lang) => supportedLanguages.includes(lang.split('-')[0])) || 'en'
  return browserLanguage.split('-')[0]
}

const preferredLanguage = localStorage.getItem('preferredLanguage') || getBrowserLanguage() // Get the preferred language from localStorage or browser preference

// Configure i18n
const i18n = createI18n({
  legacy: false, // Setting legacy to false for Composition API support
  locale: preferredLanguage, // Set the initial locale from localStorage if it exists
  fallbackLocale: 'en', // Fallback locale
  messages: {
    en,
    es,
    ja
  }
})

// Add icons
addIcons(FaExternalLinkAlt, FaSun, FaMoon, FaAdjust)

const app = createApp(App)

// Use plugins
app.use(i18n)
app.use(router)

// Register global components
app.component('v-icon', OhVueIcon)

app.mount('#app')
