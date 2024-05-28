import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

type ValidationRule = {
  validator: (value: any) => boolean
  message: string
}

type FormState = {
  name: string
  email: string
  password: string
  dob: string
  service: string
  otherService: string
  terms: boolean
}

type ErrorState = {
  [key in keyof FormState]: string
}

// Define a Pinia store named 'form'
export const useFormStore = defineStore('form', () => {
  const { t } = useI18n()

  // Reactive state for the form data
  const form = reactive<FormState>({
    name: '',
    email: '',
    password: '',
    dob: '',
    service: '',
    otherService: '',
    terms: false
  })

  // Reactive state for form error messages
  const errors = reactive<ErrorState>({
    name: '',
    email: '',
    password: '',
    dob: '',
    service: '',
    otherService: '',
    terms: ''
  })

  // Validation rules configuration
  const validationRules: { [key in keyof FormState]: ValidationRule } = {
    name: {
      validator: (value) => value.length >= 2,
      message: t('errors.name')
    },
    email: {
      validator: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
      message: t('errors.email')
    },
    password: {
      validator: (value) => /^(?=.*[0-9]).{8,}$/.test(value),
      message: t('errors.password')
    },
    dob: {
      validator: (value) => {
        const dobDate = new Date(value)
        const currentDate = new Date()
        return value && dobDate < currentDate
      },
      message: t('errors.dob')
    },
    service: {
      validator: (value) => !!value,
      message: t('errors.service')
    },
    otherService: {
      validator: (value) => form.service !== 'other' || value.length >= 2,
      message: t('errors.otherService')
    },
    terms: {
      validator: (value) => !!value,
      message: t('errors.terms')
    }
  }

  // Reset all error messages
  const resetErrors = () => {
    Object.keys(errors).forEach((key) => {
      errors[key as keyof ErrorState] = ''
    })
  }

  // Validate a specific field
  const validateField = (field: keyof FormState) => {
    if (validationRules[field]) {
      const { validator, message } = validationRules[field]
      errors[field] = validator(form[field]) ? '' : message
    }
  }

  // Validate the entire form
  const validateForm = () => {
    let valid = true
    resetErrors()

    Object.keys(validationRules).forEach((field) => {
      validateField(field as keyof FormState)
      if (errors[field as keyof ErrorState]) {
        valid = false
        console.log(`Validation failed for field: ${field}`)
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
    validateField
  }
})
