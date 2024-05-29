<script setup lang="ts">
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
</script>

<template>
  <header class="flex items-center justify-between mb-5 md:mb-10">
    <h1 class="text-3xl md:text-4xl tracking-tight">
      <slot></slot>
    </h1>
    <LanguageSwitcher />
  </header>
</template>
