# Schema Form

## Tech Stack

- React Use Form
- Shadcn
- Zod
- React
- Typescript
- usehooks
- Storybook
- Vite

## Features

- Generate beautiful form with fluid layout and customizable buttons.
- Form state management in localstorage or sessionStorage so that formValues are not refreshed when screen reloads.
- Field validation using zod, with both realtime and submit validation.

## Form Fields

- [x] Input
- [ ] Input Number
- [ ] Input OTP
- [x] Input Textarea
- [-] Select Picker
- [x] RadioGroup
- [ ] Toggle
- [ ] Checkbox
- [ ] Files Uploader
- [ ] Tags Picker
- [ ] Time Picker
- [ ] Time Range Picker
- [-] Date Picker
- [ ] Date Range Picker
- [ ] Currency Picker
- [ ] Phone Number Picker
- [ ] Color Picker
- [ ] Slider
- [ ] Captcha/ReCaptcha
- [ ] Map Picker

## Props

### ISchemaForm

### IFieldSchema

## Example Usage

### Custom

```typescript
const schemaFormProps: ISchemaForm = {
  schema: [
    {
      key: "password",
      title: "password",
      helpText: "Enter password",
      type: "password",
      placeholder: "Enter your password",
      defaultValue: "123",
      options: [
        {
          label: "Option 1",
          value: "option_1",
        },
      ],
      disabled: false,
      validations: [
        {
          type: "required",
          message: "This field is required",
        },
        {
          type: "minLength",
          value: 6,
          message: "Minimum length is 6",
        },
      ],
    },
    {
      key: "username",
      title: "username",
      helpText: "Enter username",
      type: "string",
      placeholder: "Enter your username please",
      defaultValue: "456789",
      options: [
        {
          label: "Option 1",
          value: "option_1",
        },
      ],
      disabled: false,
      validations: [
        {
          type: "required",
          message: "username required hai bhai",
        },
        {
          type: "minLength",
          value: 6,
          message: "bhot jyada hi chota h, min 6 likh le bhai",
        },
        {
          type: "maxLength",
          value: 10,
          message: "max length 10 hai bhai, thik krle",
        },
      ],
    },
    {
      key: "email",
      title: "email",
      helpText: "Enter email",
      type: "email",
      placeholder: "Enter your email please",
      defaultValue: "",
      options: [
        {
          label: "Option 1",
          value: "option_1",
        },
      ],
      disabled: false,
      validations: [
        {
          type: "required",
          message: "email is required, please enter a valid email",
        },
      ],
    },
    {
      key: "string",
      title: "textarea",
      helpText: "Enter password",
      type: "textarea",
      placeholder: "Enter your password",
      defaultValue: "",
      options: [
        {
          label: "Option 1",
          value: "option_1",
        },
      ],
      disabled: false,
      validations: [
        {
          type: "required",
          message: "This field is required",
        },
        {
          type: "minLength",
          value: 6,
          message: "Minimum length is 6",
        },
      ],
    },
    {
      key: "string2",
      title: "input date",
      helpText: "Enter password",
      type: "textarea",
      placeholder: "Enter your password",
      defaultValue: "",
      options: [
        {
          label: "Option 1",
          value: "option_1",
        },
      ],
      disabled: false,
      validations: [
        {
          type: "required",
          message: "This field is required",
        },
        {
          type: "minLength",
          value: 6,
          message: "Minimum length is 6",
        },
      ],
    },
    {
      key: "select_field",
      title: "Select Field",
      helpText: "Select an option",
      type: "select",
      placeholder: "Select an option",
      defaultValue: "something",
      options: [
        {
          label: "Something",
          value: "something",
        },
        {
          label: "Something else",
          value: "something_else",
        },
      ],
      disabled: false,
      validations: [
        {
          type: "required",
          message: "This field is required",
        },
      ],
    },
  ],
  onSubmit: (values) =>
    console.log("Example Form Response: ", JSON.stringify(values)),
};
```

### Login

```typescript
import { ISchemaForm } from "@/components/SchemaForm/SchemaForm.interface";

export const loginFormProps: ISchemaForm = {
  schema: [
    {
      key: "email",
      title: "Email",
      helpText: "Enter your email",
      type: "email",
      placeholder: "Enter your email",
      defaultValue: "abc@gmail.com",
      disabled: false,
      validations: [
        {
          type: "required",
          message: "Email is required",
        },
        {
          type: "minLength",
          value: 3,
          message: "Email must be at least 3 characters long",
        },
      ],
    },
    {
      key: "password",
      title: "Password",
      helpText: "Enter your password",
      type: "password",
      placeholder: "Enter your password",
      defaultValue: "123456",
      disabled: false,
      validations: [
        {
          type: "required",
          message: "Password is required",
        },
        {
          type: "minLength",
          value: 6,
          message: "Password must be at least 6 characters long",
        },
      ],
    },
  ],
  onSubmit: (values) =>
    console.log("Login Form Response: ", JSON.stringify(values)),
};
```
