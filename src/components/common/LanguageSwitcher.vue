<template>
  <div class="locale-changer">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="locale in availableLocales" :key="`locale-${locale}`" :value="locale">
        {{ locale }}
      </option>
    </select>
  </div>
</template>

<script setup>
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
