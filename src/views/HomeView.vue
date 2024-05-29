<script setup lang="ts">
import FormWrapper from '@/components/form/FormWrapper.vue'
import FormHeader from '@/components/form/FormHeader.vue'
import FormComponent from '@/components/form/FormComponent.vue'
import DarkModeToggle from '@/components/common/DarkModeToggle.vue'
</script>

<template>
  <FormWrapper>
    <FormHeader>{{ $t('form.formTitle') }}</FormHeader>
    <FormComponent />
    <DarkModeToggle />
  </FormWrapper>
</template>
