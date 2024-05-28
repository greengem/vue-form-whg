import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

// Defining a Pinia store named 'form'
export const useFormStore = defineStore('form', () => {
  // Extracting the translation function from vue-i18n
  const { t } = useI18n()

  // Reactive state for the form data
  const form = reactive({
    name: '' // Initial value for the name field
  })

  // Reactive state for form error messages
  const errors = reactive({
    name: '' // Initial value for the name error message
  })

  // Function to reset error messages
  const resetErrors = () => {
    errors.name = '' // Clearing the error message for the name field
  }

  // Function to validate the form data
  const validateForm = () => {
    let valid = true // Flag to track form validity
    resetErrors() // Reset any previous error messages

    // Validate the name field and set error messages accordingly
    errors.name = form.name.length >= 2 ? '' : t('errors.name') // Name must be at least 2 characters

    // Check if there are any error messages and set valid to false if any
    Object.keys(errors).forEach((key) => {
      if (errors[key as keyof typeof errors]) {
        // If there's an error message
        valid = false // Set the form validity to false
        console.log(`Validation failed for field: ${key}`) // Log the field that failed validation
      }
    })

    return valid // Return the overall form validity
  }

  // Function to handle form submission
  const handleSubmit = () => {
    console.log('Form Data:', JSON.parse(JSON.stringify(form))) // Logging form data to the console
    if (validateForm()) {
      // If the form is valid
      console.log('Form submitted successfully!') // Log a success message
      Object.assign(form, {
        name: '' // Reset the form field
      })
    }
  }

  // Returning the reactive states and functions to be used in components
  return { form, errors, handleSubmit }
})
