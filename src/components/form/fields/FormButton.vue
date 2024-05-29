<script setup lang="ts">
import { useI18n } from 'vue-i18n' // Importing the 'useI18n' function from vue-i18n for internationalization

// Defining the props that the component accepts
const props = defineProps({
  label: {
    type: String,
    required: true // The 'label' prop is required and must be a string
  },
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button' // The 'type' prop is optional and defaults to 'button'
  },
  class: {
    type: String,
    default: 'py-2 px-4 bg-slate-700 hover:bg-slate-500 rounded-md shadow-md text-slate-50' // Default classes for the button
  }
})

// Defining the 'click' event that this component can emit
const emit = defineEmits(['click'])

// Using the i18n plugin to get the translation function
const { t } = useI18n()

// Defining a handler function for the 'click' event
const handleClick = (event: Event) => {
  emit('click', event) // Emitting the 'click' event with the event object
}

// Assigning the class from props to a local variable
const buttonClass = props.class
</script>

<template>
  <div class="flex">
    <button :type="type" :class="buttonClass" @click="handleClick">
      {{ t(label) }}
    </button>
  </div>
</template>
