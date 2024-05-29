<template>
  <div class="flex items-center justify-center gap-2 pt-5">
    <button
      :class="[
        'bg-slate-300 dark:bg-slate-700 rounded-full h-8 w-8 transition-colors duration-300 ease-in-out',
        activeClass('light')
      ]"
      @click="setTheme('light')"
    >
      <v-icon name="fa-sun" />
    </button>
    <button
      :class="[
        'bg-slate-300 dark:bg-slate-700 rounded-full h-8 w-8 transition-colors duration-300 ease-in-out',
        activeClass('dark')
      ]"
      @click="setTheme('dark')"
    >
      <v-icon name="fa-moon" />
    </button>
    <button
      :class="[
        'bg-slate-300 dark:bg-slate-700 rounded-full h-8 w-8 transition-colors duration-300 ease-in-out',
        activeClass('system')
      ]"
      @click="setTheme('system')"
    >
      <v-icon name="fa-adjust" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

// Reactive state for the theme
const theme = ref(localStorage.getItem('theme') || 'system')

// Method to set the theme
const setTheme = (value: string) => {
  theme.value = value
  localStorage.setItem('theme', value)
  applyTheme()
}

// Function to get active class
const activeClass = (mode: string) => {
  return theme.value === mode ? 'ring-2 ring-blue-500' : ''
}

// Method to apply the theme
const applyTheme = () => {
  const root = document.documentElement
  const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (theme.value === 'system') {
    root.classList.remove('dark')
    if (userPrefersDark) {
      root.classList.add('dark')
    }
  } else if (theme.value === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

// Watcher to apply theme on change
watch(theme, applyTheme)

// Listener for system theme changes
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')
systemPrefersDark.addEventListener('change', () => {
  if (theme.value === 'system') {
    applyTheme()
  }
})

// Apply theme on initial load
onMounted(applyTheme)
</script>
