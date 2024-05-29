<template>
  <label :for="forField" class="block text-sm text-slate-900 dark:text-slate-200 mb-1">
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
const { forField } = defineProps({
  forField: String
})
</script>
