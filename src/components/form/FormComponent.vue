<template>
  <form @submit.prevent="handleSubmit" novalidate="true" class="flex flex-col gap-y-3">
    <FormFieldWrapper>
      <FormLabel forField="name">{{ $t('form.name') }}</FormLabel>
      <input
        autofocus
        type="text"
        id="name"
        v-model="form.name"
        @blur="() => validateField('name')"
        class="px-3 py-2 rounded-lg bg-slate-800 text-slate-100 shadow-md"
      />
      <FormError :error="errors.name ? $t('errors.name') : null" />
    </FormFieldWrapper>

    <FormFieldWrapper>
      <FormLabel forField="email">{{ $t('form.email') }}</FormLabel>
      <input
        type="email"
        id="email"
        v-model="form.email"
        @blur="() => validateField('email')"
        class="px-3 py-2 rounded-lg bg-slate-800 text-slate-100 shadow-md"
      />
      <FormError :error="errors.email ? $t('errors.email') : null" />
    </FormFieldWrapper>

    <FormFieldWrapper>
      <FormLabel forField="password">{{ $t('form.password') }}</FormLabel>
      <input
        type="password"
        id="password"
        v-model="form.password"
        @blur="() => validateField('password')"
        class="px-3 py-2 rounded-lg bg-slate-800 text-slate-100 shadow-md"
      />
      <FormError :error="errors.password ? $t('errors.password') : null" />
    </FormFieldWrapper>

    <FormFieldWrapper>
      <FormLabel forField="dob">{{ $t('form.dob') }}</FormLabel>
      <input
        type="date"
        id="dob"
        v-model="form.dob"
        @blur="() => validateField('dob')"
        class="px-3 py-2 rounded-lg bg-slate-800 text-slate-100 shadow-md"
      />
      <FormError :error="errors.dob ? $t('errors.dob') : null" />
    </FormFieldWrapper>

    <FormFieldWrapper>
      <FormLabel forField="service">{{ $t('form.service') }}</FormLabel>
      <select
        id="service"
        v-model="form.service"
        @blur="() => validateField('service')"
        class="px-3 py-2 rounded-lg bg-slate-800 text-slate-100 shadow-md"
      >
        <option value="" disabled>{{ $t('form.serviceOptions.choose') }}</option>
        <option value="webDevelopment">{{ $t('form.serviceOptions.webDevelopment') }}</option>
        <option value="mobileDevelopment">{{ $t('form.serviceOptions.mobileDevelopment') }}</option>
        <option value="seoServices">{{ $t('form.serviceOptions.seoServices') }}</option>
        <option value="other">{{ $t('form.serviceOptions.other') }}</option>
      </select>
      <FormError :error="errors.service ? $t('errors.service') : null" />
    </FormFieldWrapper>

    <FormFieldWrapper v-if="form.service === 'other'">
      <FormLabel forField="otherService">{{ $t('form.otherService') }}</FormLabel>
      <input
        type="text"
        id="otherService"
        v-model="form.otherService"
        @blur="() => validateField('otherService')"
        class="px-3 py-2 rounded-lg bg-slate-800 text-slate-100 shadow-md"
      />
      <FormError :error="errors.otherService ? $t('errors.otherService') : null" />
    </FormFieldWrapper>

    <FormFieldWrapper>
      <div class="flex items-center gap-x-2">
        <input
          type="checkbox"
          id="terms"
          v-model="form.terms"
          @blur="() => validateField('terms')"
          class="px-3 py-2 rounded-lg bg-slate-800 text-slate-100 shadow-md"
        />
        <FormLabel forField="terms" class="mb-0">
          {{ $t('form.terms') }}
          <router-link to="/terms"><v-icon name="fa-external-link-alt" /></router-link>
        </FormLabel>
      </div>
      <FormError :error="errors.terms ? $t('errors.terms') : null" />
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
const { form, errors, handleSubmit, validateField } = formStore
</script>
