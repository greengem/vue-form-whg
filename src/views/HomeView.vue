<script setup lang="ts">
import FormWrapper from '@/components/form/FormWrapper.vue'
import FormHeader from '@/components/form/FormHeader.vue'
import FormComponent from '@/components/form/FormComponent.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
</script>

<template>
  <FormWrapper>
    <FormHeader />
    <LanguageSwitcher />
    <FormComponent />
  </FormWrapper>
</template>
