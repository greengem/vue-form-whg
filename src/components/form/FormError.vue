<template>
  <div class="text-red-600 text-sm h-5 mt-1">
    <span v-if="error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
const { error } = defineProps<{ error: string | null }>()
</script>
