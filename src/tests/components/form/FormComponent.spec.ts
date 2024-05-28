// tests/FormComponent.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { i18n } from '@/tests/i18n'
import FormComponent from '@/components/form/FormComponent.vue'
import en from '@/locales/en.json'
import es from '@/locales/es.json'
import ja from '@/locales/ja.json'

// Mock components to isolate FormComponent functionality from dependencies
const routerLinkMock = {
  template: '<div><slot /></div>'
}
const vIconMock = {
  template: '<span></span>'
}

describe('FormComponent', () => {
  let wrapper: any

  // Set up the test environment before each test
  beforeEach(() => {
    wrapper = mount(FormComponent, {
      global: {
        plugins: [i18n],
        components: {
          'router-link': routerLinkMock, // Mocking router-link component
          'v-icon': vIconMock // Mocking v-icon component
        }
      }
    })
  })

  // Test to check if the form renders correctly
  it('renders the form', () => {
    expect(wrapper.find('form').exists()).toBe(true)
  })

  // Test to validate that empty fields show appropriate error messages
  it('validates empty fields', async () => {
    await wrapper.find('form').trigger('submit.prevent')

    const errorMessages = wrapper.findAllComponents({ name: 'FormError' })

    // Check that error messages are displayed for all required fields
    expect(errorMessages.length).toBeGreaterThan(0)
    expect(wrapper.text()).toContain(en.errors.name)
    expect(wrapper.text()).toContain(en.errors.email)
    expect(wrapper.text()).toContain(en.errors.password)
    expect(wrapper.text()).toContain(en.errors.dob)
    expect(wrapper.text()).toContain(en.errors.service)
    expect(wrapper.text()).toContain(en.errors.terms)
  })

  // Test to validate that an invalid email shows an appropriate error message
  it('shows error message for invalid email', async () => {
    const emailInput = wrapper.find('input[type="email"]')
    await emailInput.setValue('invalid-email')
    await emailInput.trigger('blur')

    expect(wrapper.text()).toContain(en.errors.email)
  })

  // Test to validate that a short name shows an appropriate error message
  it('shows error message for short name', async () => {
    const nameInput = wrapper.find('input#name')
    await nameInput.setValue('A')
    await nameInput.trigger('blur')

    expect(wrapper.text()).toContain(en.errors.name)
  })

  // Test to validate that an invalid password shows an appropriate error message
  it('shows error message for invalid password', async () => {
    const passwordInput = wrapper.find('input#password')
    await passwordInput.setValue('short')
    await passwordInput.trigger('blur')

    expect(wrapper.text()).toContain(en.errors.password)
  })

  // Test to validate that a future date of birth shows an appropriate error message
  it('shows error message for future date of birth', async () => {
    const dobInput = wrapper.find('input#dob')
    await dobInput.setValue('2100-01-01')
    await dobInput.trigger('blur')

    expect(wrapper.text()).toContain(en.errors.dob)
  })

  // Test to validate that not selecting a service shows an appropriate error message
  it('shows error message for unselected service', async () => {
    const serviceSelect = wrapper.find('select#service')
    await serviceSelect.setValue('')
    await serviceSelect.trigger('blur')

    expect(wrapper.text()).toContain(en.errors.service)
  })

  // Test to validate that not accepting terms and conditions shows an appropriate error message
  it('shows error message for unaccepted terms', async () => {
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain(en.errors.terms)
  })

  // Test to reveal and validate the "other service" input field
  it('reveals and validates other service input', async () => {
    const serviceSelect = wrapper.find('select#service')
    await serviceSelect.setValue('other')
    await serviceSelect.trigger('blur')

    // Check that the "other service" input field is revealed
    expect(wrapper.find('input#otherService').exists()).toBe(true)

    const otherServiceInput = wrapper.find('input#otherService')
    await otherServiceInput.setValue('')
    await otherServiceInput.trigger('blur')

    // Check that an appropriate error message is displayed
    expect(wrapper.text()).toContain(en.errors.otherService)
  })

  // Test to validate that a successful form submission shows a success message
  it('shows success message on valid submission', async () => {
    await wrapper.find('input#name').setValue('John Doe')
    await wrapper.find('input#email').setValue('john.doe@example.com')
    await wrapper.find('input#password').setValue('password1')
    await wrapper.find('input#dob').setValue('2000-01-01')
    await wrapper.find('select#service').setValue('webDevelopment')
    await wrapper.find('input#terms').setChecked()

    await wrapper.find('form').trigger('submit.prevent')

    // Check that the success message is displayed
    expect(wrapper.find('.text-green-500').exists()).toBe(true)
    expect(wrapper.find('.text-green-500').text()).toBe(en.successMessage)
  })

  // Test to switch the language to Spanish and validate labels and error messages
  it('switches language to Spanish and updates labels and errors', async () => {
    i18n.global.locale.value = 'es' as 'es'

    await wrapper.find('input#name').setValue('A')
    await wrapper.find('input#name').trigger('blur')

    // Check that the error message is displayed in Spanish
    expect(wrapper.text()).toContain(es.errors.name)

    await wrapper.find('input#email').setValue('invalid-email')
    await wrapper.find('input#email').trigger('blur')

    // Check that the error message is displayed in Spanish
    expect(wrapper.text()).toContain(es.errors.email)
  })

  // Test to switch the language to Japanese and validate labels and error messages
  it('switches language to Japanese and updates labels and errors', async () => {
    i18n.global.locale.value = 'ja' as 'ja'

    await wrapper.find('input#name').setValue('A')
    await wrapper.find('input#name').trigger('blur')

    // Check that the error message is displayed in Japanese
    expect(wrapper.text()).toContain(ja.errors.name)

    await wrapper.find('input#email').setValue('invalid-email')
    await wrapper.find('input#email').trigger('blur')

    // Check that the error message is displayed in Japanese
    expect(wrapper.text()).toContain(ja.errors.email)
  })
})
