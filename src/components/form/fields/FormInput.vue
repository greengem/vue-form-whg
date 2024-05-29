<script setup lang="ts">
import { computed, ref } from 'vue'
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

// Track if the input has been touched
const isTouched = ref(false)

// Defining a class string for the input element
const baseClass =
  'text-sm w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-red-500 shadow-md appearance-none focus:outline-none'

// Creating a computed property for the input element classes
const inputClass = computed(() => ({
  [baseClass]: true,
  'ring-1': true,
  'ring-red-400 dark:ring-red-600': isTouched.value && props.error,
  'ring-green-400 dark:ring-green-600': isTouched.value && !props.error && model,
  'ring-slate-200 dark:ring-slate-600': !isTouched.value || (!props.error && !model.value)
}))

// Creating a computed property for the error message, translating it if an error exists
const computedError = computed(() => (props.error ? t(props.error) : null))

// Defining a handler function for the 'blur' event
const handleBlur = () => {
  isTouched.value = true
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
