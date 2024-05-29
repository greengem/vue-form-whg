<template>
  <div class="locale-changer relative">
    <select
      v-model="selectedLocale"
      @change="changeLocale"
      class="text-sm w-14 px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 dark:text-slate-100 shadow-md ring-1 ring-slate-300 dark:ring-slate-700 appearance-none"
    >
      <option v-for="locale in availableLocales" :key="`locale-${locale}`" :value="locale">
        {{ locale }}
      </option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
    >
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M7 10l5 5 5-5H7z" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { availableLocales, locale } = useI18n()

const selectedLocale = computed({
  get: () => locale.value,
  set: (value) => {
    locale.value = value
    localStorage.setItem('preferredLanguage', value) // Save the selected language to localStorage
  }
})

const changeLocale = () => {
  localStorage.setItem('preferredLanguage', selectedLocale.value)
}
</script>
