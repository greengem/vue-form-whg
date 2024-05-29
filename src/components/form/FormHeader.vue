<script setup lang="ts">
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
</script>

<template>
  <header class="flex items-center justify-between mb-7">
    <h1 class="text-2xl md:text-3xl dark:text-slate-50 tracking-tight">
      <slot></slot>
    </h1>
    <LanguageSwitcher />
  </header>
</template>
