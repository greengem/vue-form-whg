<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FormFieldWrapper from '@/components/form/fields/FormFieldWrapper.vue'
import FormLabel from '@/components/form/fields/FormLabel.vue'
import FormError from '@/components/form/fields/FormError.vue'

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
  link: {
    type: String,
    default: null // The 'link' prop is optional and defaults to null
  },
  type: {
    type: String,
    default: 'checkbox' // The 'type' prop is optional and defaults to 'checkbox'
  },
  error: {
    type: String,
    default: undefined // The 'error' prop is optional and defaults to undefined
  }
})

// Defining a reactive model for the checkbox value
const model = defineModel<boolean>()

// Defining the 'blur' event that this component can emit
const emit = defineEmits(['blur'])

// Using the i18n plugin to get the translation function
const { t } = useI18n()

// Defining a class string for the checkbox element
const checkboxClass = 'form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'

// Creating a computed property for the error message, translating it if an error exists
const computedError = computed(() => (props.error ? t(props.error) : null))

// Defining a handler function for the 'blur' event
const handleBlur = () => {
  emit('blur', props.id) // Emitting the 'blur' event with the checkbox's id
}
</script>

<template>
  <FormFieldWrapper>
    <div class="flex items-center gap-x-1">
      <input :type="type" :id="id" v-model="model" @blur="handleBlur" :class="checkboxClass" />
      <FormLabel :for="id" class="flex items-center gap-x-1 !mb-0">
        <span>{{ $t(label) }}</span>
        <router-link
          v-if="link"
          :to="link"
          target="_blank"
          class="text-blue-500"
          aria-label="Link to Terms and Conditions"
        >
          <v-icon name="fa-external-link-alt" scale="0.8" />
        </router-link>
      </FormLabel>
    </div>
    <FormError :error="computedError" />
  </FormFieldWrapper>
</template>
