<script setup lang="ts">
import FormWrapper from '@/components/form/FormWrapper.vue'
import FormHeader from '@/components/form/FormHeader.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <FormWrapper>
    <FormHeader>{{ t('terms.title') }}</FormHeader>
    <p class="mb-5 text-slate-900 dark:text-white">{{ t('terms.welcomeMessage') }}</p>
  </FormWrapper>
</template>
