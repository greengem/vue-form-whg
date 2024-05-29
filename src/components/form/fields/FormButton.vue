<script setup lang="ts">
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
    default: 'py-2 px-4 bg-slate-700 rounded-md shadow-md text-slate-50' // Default classes for the button
  }
})

// Defining the 'click' event that this component can emit
const emit = defineEmits(['click'])

// Defining a handler function for the 'click' event
const handleClick = (event: Event) => {
  emit('click', event) // Emitting the 'click' event with the event object
}

// Assigning the class from props to a local variable
const buttonClass = props.class
</script>

<template>
  <button :type="type" :class="buttonClass" @click="handleClick">
    {{ label }}
  </button>
</template>
