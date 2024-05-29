<script setup lang="ts">
import FormInput from '@/components/form/fields/FormInput.vue'
import FormSelect from '@/components/form/fields/FormSelect.vue'
import FormCheckbox from '@/components/form/fields/FormCheckbox.vue'
import FormButton from '@/components/form/fields/FormButton.vue'
import FormSuccess from '@/components/form/FormSuccess.vue'

import { useForm } from '@/composables/useForm'
const { form, errors, isSuccess, handleSubmit, validateField } = useForm()
</script>

<template>
  <form @submit.prevent="handleSubmit" novalidate class="flex flex-col gap-y-3">
    <FormInput
      id="name"
      label="form.name"
      v-model="form.name"
      :error="errors.name ? 'errors.name' : undefined"
      required
      autofocus
      @blur="validateField"
    />

    <FormInput
      id="email"
      label="form.email"
      type="email"
      v-model="form.email"
      :error="errors.email ? 'errors.email' : undefined"
      required
      @blur="validateField"
    />

    <FormInput
      id="password"
      label="form.password"
      type="password"
      v-model="form.password"
      :error="errors.password ? 'errors.password' : undefined"
      required
      @blur="validateField"
    />

    <FormInput
      id="dob"
      label="form.dob"
      type="date"
      v-model="form.dob"
      :error="errors.dob ? 'errors.dob' : undefined"
      required
      @blur="validateField"
    />

    <FormSelect
      id="service"
      label="form.service"
      v-model="form.service"
      :error="errors.service ? 'errors.service' : undefined"
      :options="[
        { value: 'webDevelopment', label: 'form.serviceOptions.webDevelopment' },
        { value: 'mobileDevelopment', label: 'form.serviceOptions.mobileDevelopment' },
        { value: 'seoServices', label: 'form.serviceOptions.seoServices' },
        { value: 'other', label: 'form.serviceOptions.other' }
      ]"
      required
      @blur="validateField"
    />

    <FormInput
      v-if="form.service === 'other'"
      id="otherService"
      label="form.otherService"
      v-model="form.otherService"
      :error="errors.otherService ? 'errors.otherService' : undefined"
      @blur="validateField"
    />

    <FormCheckbox
      id="terms"
      label="form.terms"
      v-model="form.terms"
      :error="errors.terms ? 'errors.terms' : undefined"
      link="/terms"
      @blur="validateField"
    />

    <FormButton type="submit" label="form.submit" />

    <FormSuccess v-show="isSuccess">
      {{ $t('successMessage') }}
    </FormSuccess>
  </form>
</template>
