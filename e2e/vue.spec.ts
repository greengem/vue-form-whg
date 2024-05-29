import { test, expect } from '@playwright/test'

test('Form submission shows success message', async ({ page }) => {
  // Navigate to the form page
  await page.goto('http://localhost:5173')

  // Fill out the form
  await page.fill('#name', 'John Doe') // Fill the name field with 'John Doe'
  await page.fill('#email', 'john.doe@example.com') // Fill the email field with 'john.doe@example.com'
  await page.fill('#password', 'password1') // Fill the password field with 'password1'
  await page.fill('#confirmPassword', 'password1') // Fill the confirm password field with 'password1'
  await page.fill('#dob', '2000-01-01') // Fill the date of birth field with '2000-01-01'
  await page.selectOption('#service', 'webDevelopment') // Select the 'webDevelopment' option from the service dropdown
  await page.check('#terms') // Check the terms checkbox

  // Submit the form
  await page.click('button[type="submit"]')

  // Check for the success message
  const successMessage = page.locator('#form-success-message') // Locate the success message element
  await expect(successMessage).toBeVisible() // Assert that the success message is visible
  await expect(successMessage).toHaveText('Form submitted successfully!') // Assert that the success message has the expected text
})
