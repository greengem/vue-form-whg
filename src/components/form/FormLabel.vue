<template>
  <label :for="forField" class="block text-sm font-medium text-slate-200 mb-1">
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
const { forField } = defineProps({
  forField: String
})
</script>
