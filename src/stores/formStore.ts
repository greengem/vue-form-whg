import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

// Define a Pinia store named 'form'
export const useFormStore = defineStore('form', () => {
  const { t } = useI18n()

  // Reactive state for the form data
  const form = reactive({
    name: '',
    email: '',
    password: '',
    dob: '',
    service: '',
    otherService: '',
    terms: false
  })

  // Reactive state for form error messages
  const errors = reactive({
    name: '',
    email: '',
    password: '',
    dob: '',
    service: '',
    otherService: '',
    terms: ''
  })

  // Reset all error messages
  const resetErrors = () => {
    errors.name = ''
    errors.email = ''
    errors.password = ''
    errors.dob = ''
    errors.service = ''
    errors.otherService = ''
    errors.terms = ''
  }

  // Validate the form data
  const validateForm = () => {
    let valid = true
    resetErrors()

    // Name validation: must be at least 2 characters long
    errors.name = form.name.length >= 2 ? '' : t('errors.name')

    // Email validation: must match a standard email pattern
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    errors.email = emailRegex.test(form.email) ? '' : t('errors.email')

    // Password validation: must be at least 8 characters long and contain at least one number
    const passwordRegex = /^(?=.*[0-9]).{8,}$/
    errors.password = passwordRegex.test(form.password) ? '' : t('errors.password')

    // Date of birth validation: must be a past date
    const dobDate = new Date(form.dob)
    const currentDate = new Date()
    errors.dob = form.dob && dobDate < currentDate ? '' : t('errors.dob')

    // Service selection validation: must select a service
    errors.service = form.service ? '' : t('errors.service')

    // Other service validation: if 'Other' is selected, the input must be at least 2 characters long
    if (form.service === 'other') {
      errors.otherService = form.otherService.length >= 2 ? '' : t('errors.otherService')
    }

    // Terms and conditions validation: must be accepted
    errors.terms = form.terms ? '' : t('errors.terms')

    // Check for any errors and log validation failures
    Object.keys(errors).forEach((key) => {
      if (errors[key as keyof typeof errors]) {
        valid = false
        console.log(`Validation failed for field: ${key}`)
      }
    })

    return valid
  }

  // Handle form submission
  const handleSubmit = () => {
    console.log('Form Data:', JSON.parse(JSON.stringify(form)))
    if (validateForm()) {
      console.log('Form submitted successfully!')
      Object.assign(form, {
        name: '',
        email: '',
        password: '',
        dob: '',
        service: '',
        otherService: '',
        terms: false
      })
    }
  }

  return { form, errors, handleSubmit }
})
