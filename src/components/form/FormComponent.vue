<template>
  <form @submit.prevent="handleSubmit" novalidate="true" class="flex flex-col gap-y-3">
    <FormFieldWrapper>
      <FormLabel forField="name">{{ $t('form.name') }}</FormLabel>
      <input
        type="text"
        id="name"
        v-model="form.name"
        class="px-3 py-2 rounded-lg bg-slate-800 text-slate-100 shadow-md"
      />
      <FormError :error="errors.name ? $t('errors.name') : null" />
    </FormFieldWrapper>

    <div class="flex">
      <button type="submit" class="py-2 px-4 bg-slate-700 rounded-md shadow-md text-slate-50">
        {{ $t('form.submit') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/formStore'

import FormFieldWrapper from '@/components/form/FormFieldWrapper.vue'
import FormLabel from '@/components/form/FormLabel.vue'
import FormError from '@/components/form/FormError.vue'

const formStore = useFormStore()
const { form, errors, handleSubmit } = formStore
</script>
