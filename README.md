# WHG Vue Technical Test

## Project Overview

This project is a dynamic form built with Vue.js that includes validation, progressive disclosure, and internationalization (i18n). The form is designed to capture user information with various input types and enforce validation rules. Additionally, it supports responsive design, dark mode, and comprehensive testing.

## Setup Instructions

### Prerequisites

- Node.js (version 18.3 or later)
- npm (version 8.0.0 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/greengem/vue-form-whg
   cd vue-form-whg
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5173/` to see the form in action.

### Running Tests

1. Run unit tests with Vitest:
   ```bash
   npm run test:unit
   ```
2. Run end-to-end tests with Playwright:
   ```bash
   npm run test:e2e
   ```

## Usage

### Form Inputs and Validation

- **Name**: Required, minimum 2 characters
- **Email**: Required, must be a valid email format
- **Password**: Required, minimum 8 characters with at least one number
- **Confirm Password**: Required, has to match password value
- **Date of Birth**: Optional, must be a past date
- **Choice of Service**: Dropdown with options (Web Development, Mobile Development, SEO Services, Other)
  - If "Other" is selected, an additional text input for specifying the service appears
- **Terms and Conditions**: Checkbox, must be checked before submission

### Form Submission

- Upon successful validation, a success message is displayed.
- If validation fails, errors are highlighted and displayed next to the respective input fields.

## Implementation Details

### Project Structure

todo

### Key Vue.js Features Used

- **Reactive Forms**: Utilized Vue's reactivity to manage form state and validation.
- **Computed Properties**: For derived state, such as dynamic validation messages and progressive disclosure logic.
- **Vue Router**: For navigation, including a link to the Terms and Conditions page.
- **Tailwind CSS**: For styling and responsive design.
- **Vue-i18n**: For internationalization, supporting English, Spanish, and Japanese.
- **LocalStorage**: For persisting language and dark mode preferences.

### Progressive Disclosure

- The "Other" option in the service dropdown reveals an additional input field for specifying the service.

### Validation Enhancements

- Validation occurs on submit and when input fields lose focus.
- Real-time validation updates when the user corrects errors.
- Visual indicators show validation status (green for valid, red for invalid).

### Dark Mode

- Theme colour is initially decided by the users system preference.
- A dark mode toggle is available, with the preference stored in local storage.

### Internationalization (i18n)

- Implemented using `vue-i18n` with support for English, Spanish, and Japanese.
- Language switcher component allows dynamic language changes, persisted in local storage.

### Key Points about `useForm` Composable

- **Reactive Form State**: Managed using Vue's reactive API.
- **Dynamic Validation**: Validation rules are defined for each form field and are applied dynamically.
- **Error Handling**: Errors are tracked in a reactive object and updated based on validation results.
- **Form Submission**: Handles form submission by validating all fields and resetting the form state on success.
- **Internationalization**: Uses `vue-i18n` for error messages, allowing for easy translation and localization.

## Assumptions

- Users will have JavaScript enabled in their browsers.
- The form does not need to handle server-side validation or submission.
- The initial language for internationalization is set based on the user's browser settings.

## Conclusion

todo
