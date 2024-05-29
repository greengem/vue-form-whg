// src/composables/useForm.ts

import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

// Define the structure of validation rules
export type ValidationRule = {
  validator: (value: any, form?: any) => boolean
  message: string
}

// Define the structure of the form state
export type FormState = {
  name: string
  email: string
  password: string
  confirmPassword: string
  dob: string
  service: string
  otherService: string
  terms: boolean
}

// Define the structure of the error state
export type ErrorState = {
  [key in keyof FormState]: string
}

// Composable function to handle form logic
export function useForm() {
  // Use internationalization (i18n) for error messages
  const { t } = useI18n()

  // Initialize the reactive form state
  const form = reactive<FormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    service: '',
    otherService: '',
    terms: false
  })

  // Initialize the reactive error state
  const errors = reactive<ErrorState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    service: '',
    otherService: '',
    terms: ''
  })

  // Flag to indicate successful form submission
  const isSuccess = ref(false)

  // Define validation rules for each form field
  const validationRules: { [key in keyof FormState]: ValidationRule } = {
    name: {
      // Name must be at least 2 characters long
      validator: (value) => value.length >= 2,
      message: t('errors.name')
    },
    email: {
      // Email must be in a valid email format
      validator: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
      message: t('errors.email')
    },
    password: {
      // Password must be at least 8 characters long and contain at least one number
      validator: (value) => /^(?=.*[0-9]).{8,}$/.test(value),
      message: t('errors.password')
    },
    confirmPassword: {
      // Confirm password must match the password field
      validator: (value, form) => value === form.password,
      message: t('errors.confirmPassword')
    },
    dob: {
      // Date of birth must be a valid past date
      validator: (value) => {
        const dobDate = new Date(value)
        const currentDate = new Date()
        return value && dobDate < currentDate
      },
      message: t('errors.dob')
    },
    service: {
      // Service must be selected
      validator: (value) => !!value,
      message: t('errors.service')
    },
    otherService: {
      // Other service must be specified if "Other" is selected
      validator: (value, form) => form.service !== 'other' || value.length >= 2,
      message: t('errors.otherService')
    },
    terms: {
      // Terms and conditions must be accepted
      validator: (value) => !!value,
      message: t('errors.terms')
    }
  }

  // Function to reset error messages
  const resetErrors = () => {
    Object.keys(errors).forEach((key) => {
      errors[key as keyof ErrorState] = ''
    })
  }

  // Function to validate a specific field
  const validateField = (field: keyof FormState) => {
    if (validationRules[field]) {
      const { validator, message } = validationRules[field]
      errors[field] = validator(form[field], form) ? '' : message
    }
  }

  // Function to validate the entire form
  const validateForm = () => {
    let valid = true
    resetErrors()

    Object.keys(validationRules).forEach((field) => {
      validateField(field as keyof FormState)
      if (errors[field as keyof ErrorState]) {
        valid = false
      }
    })

    return valid
  }

  // Function to handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      isSuccess.value = true
      Object.assign(form, {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
        service: '',
        otherService: '',
        terms: false
      })
    }
  }

  // Return the form state, error state, and handler functions
  return {
    form,
    errors,
    isSuccess,
    handleSubmit,
    validateField
  }
}
