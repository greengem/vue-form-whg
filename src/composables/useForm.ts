// src/composables/useForm.ts
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

export type ValidationRule = {
  validator: (value: any, form?: any) => boolean
  message: string
}

export type FormState = {
  name: string
  email: string
  password: string
  dob: string
  service: string
  otherService: string
  terms: boolean
}

export type ErrorState = {
  [key in keyof FormState]: string
}

export function useForm() {
  const { t } = useI18n()

  const form = reactive<FormState>({
    name: '',
    email: '',
    password: '',
    dob: '',
    service: '',
    otherService: '',
    terms: false
  })

  const errors = reactive<ErrorState>({
    name: '',
    email: '',
    password: '',
    dob: '',
    service: '',
    otherService: '',
    terms: ''
  })

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
      validator: (value, form) => form.service !== 'other' || value.length >= 2,
      message: t('errors.otherService')
    },
    terms: {
      validator: (value) => !!value,
      message: t('errors.terms')
    }
  }

  const resetErrors = () => {
    Object.keys(errors).forEach((key) => {
      errors[key as keyof ErrorState] = ''
    })
  }

  const validateField = (field: keyof FormState) => {
    if (validationRules[field]) {
      const { validator, message } = validationRules[field]
      errors[field] = validator(form[field], form) ? '' : message
    }
  }

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

  const handleSubmit = () => {
    if (validateForm()) {
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
}
