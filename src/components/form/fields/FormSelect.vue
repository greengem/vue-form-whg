<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FormFieldWrapper from '@/components/form/FormFieldWrapper.vue'
import FormLabel from '@/components/form/FormLabel.vue'
import FormError from '@/components/form/FormError.vue'

// Define an interface for the options in the select field
interface Option {
  value: string
  label: string
}

// Defining the props that the component accepts
const props = defineProps<{
  id: string // The 'id' prop is required and must be a string
  label: string // The 'label' prop is required and must be a string
  options: Option[] // The 'options' prop is required and must be an array of Option objects
  required?: boolean // The 'required' prop is optional and defaults to false
  error?: string // The 'error' prop is optional and defaults to undefined
}>()

// Defining a reactive model for the select value
const model = defineModel<string>()

// Defining the 'blur' event that this component can emit
const emit = defineEmits(['blur'])

// Using the i18n plugin to get the translation function
const { t } = useI18n()

// Defining a class string for the select element
const selectClass =
  'text-sm w-full px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 dark:text-slate-100 shadow-md ring-1 ring-slate-300 dark:ring-slate-700 appearance-none pointer-events-none'

// Creating a computed property for the error message, translating it if an error exists
const computedError = computed(() => (props.error ? t(props.error) : null))

// Defining a handler function for the 'blur' event
const handleBlur = () => {
  emit('blur', props.id) // Emitting the 'blur' event with the select's id
}
</script>

<template>
  <FormFieldWrapper>
    <FormLabel :for="id">
      {{ $t(label) }} <span class="text-red-500" v-if="required">*</span>
    </FormLabel>
    <div class="relative">
      <select :id="id" v-model="model" @blur="handleBlur" :class="selectClass">
        <option value="" disabled>{{ $t('form.serviceOptions.choose') }}</option>
        <option v-for="(option, index) in options" :key="index" :value="option.value">
          {{ $t(option.label) }}
        </option>
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
      >
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>
    </div>
    <FormError :error="computedError" />
  </FormFieldWrapper>
</template>
