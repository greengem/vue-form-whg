<script setup lang="ts">
import FormWrapper from '@/components/form/FormWrapper.vue'
import FormHeader from '@/components/form/FormHeader.vue'
import FormComponent from '@/components/form/FormComponent.vue'
</script>

<template>
  <FormWrapper>
    <FormHeader>{{ $t('form.formTitle') }}</FormHeader>
    <FormComponent />
  </FormWrapper>
</template>
