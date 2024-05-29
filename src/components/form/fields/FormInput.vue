<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FormFieldWrapper from '@/components/form/FormFieldWrapper.vue'
import FormLabel from '@/components/form/FormLabel.vue'
import FormError from '@/components/form/FormError.vue'

// Defining the props that the component accepts
const props = defineProps({
  id: {
    type: String,
    required: true // The 'id' prop is required and must be a string
  },
  label: {
    type: String,
    required: true // The 'label' prop is required and must be a string
  },
  type: {
    type: String,
    default: 'text' // The 'type' prop is optional and defaults to 'text'
  },
  required: {
    type: Boolean,
    default: false // The 'required' prop is optional and defaults to 'false'
  },
  error: {
    type: String,
    default: undefined // The 'error' prop is optional and defaults to 'undefined'
  },
  autofocus: {
    type: Boolean,
    default: false // The 'autofocus' prop is optional and defaults to 'false'
  }
})

// Defining a reactive model for the input value
const model = defineModel()

// Defining the 'blur' event that this component can emit
const emit = defineEmits(['blur'])

// Using the i18n plugin to get the translation function
const { t } = useI18n()

// Defining a class string for the input element
const inputClass =
  'text-sm w-full px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 dark:text-slate-100 shadow-md ring-1 ring-slate-300 dark:ring-slate-700  appearance-none'

// Creating a computed property for the error message, translating it if an error exists
const computedError = computed(() => (props.error ? t(props.error) : null))

// Defining a handler function for the 'blur' event
const handleBlur = () => {
  emit('blur', props.id) // Emitting the 'blur' event with the input's id
}
</script>

<template>
  <FormFieldWrapper>
    <FormLabel :for="id">
      {{ $t(label) }} <span class="text-red-500" v-if="required">*</span>
    </FormLabel>
    <input
      :type="type"
      :id="id"
      v-model="model"
      @blur="handleBlur"
      :class="inputClass"
      :autofocus="autofocus"
    />
    <FormError :error="computedError" />
  </FormFieldWrapper>
</template>

<style scoped>
/* Fix for the shrunken height issue in iOS */
input[type='date']::-webkit-date-and-time-value {
  height: 1.5em;
}
</style>
