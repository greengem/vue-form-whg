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

  // Individual field validation functions
  const validateName = () => {
    errors.name = form.name.length >= 2 ? '' : t('errors.name')
  }

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    errors.email = emailRegex.test(form.email) ? '' : t('errors.email')
  }

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[0-9]).{8,}$/
    errors.password = passwordRegex.test(form.password) ? '' : t('errors.password')
  }

  const validateDob = () => {
    const dobDate = new Date(form.dob)
    const currentDate = new Date()
    errors.dob = form.dob && dobDate < currentDate ? '' : t('errors.dob')
  }

  const validateService = () => {
    errors.service = form.service ? '' : t('errors.service')
  }

  const validateOtherService = () => {
    if (form.service === 'other') {
      errors.otherService = form.otherService.length >= 2 ? '' : t('errors.otherService')
    }
  }

  const validateTerms = () => {
    errors.terms = form.terms ? '' : t('errors.terms')
  }

  // Validate the entire form
  const validateForm = () => {
    let valid = true
    resetErrors()

    // Validate all fields
    validateName()
    validateEmail()
    validatePassword()
    validateDob()
    validateService()
    validateOtherService()
    validateTerms()

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

  return {
    form,
    errors,
    handleSubmit,
    validateName,
    validateEmail,
    validatePassword,
    validateDob,
    validateService,
    validateOtherService,
    validateTerms
  }
})
