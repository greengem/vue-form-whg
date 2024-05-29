<template>
  <div class="text-red-600 text-xs min-h-4 mt-1">
    <span v-if="error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
const { error } = defineProps<{ error: string | null }>()
</script>
