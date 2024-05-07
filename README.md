# @adimis/react-schema-form

The `@adimis/react-schema-form` is a React component library that provides a schema-based approach to form creation, leveraging Shadcn components for styling. This package simplifies the development of complex forms within React 18.2.0 or Next.js App Router 14.2.3 environments, incorporating Zod for robust form validation capabilities.

## Features

- **ShadcnForm Component**: Dynamically render forms from schema definitions with integrated Zod validation. This component ensures data integrity and simplifies form handling.
- **SchemaFormProvider and useSchemaFormContext**: Manage and share form state across components using React's Context API. This setup allows for complex, customizable form behaviors without the need for additional libraries.
- **Advanced Validation**: Employ Zod to validate complex data structures including nested objects and arrays, enhancing form validation beyond basic types.
- **Conditional Logic**: Implement dynamic form behaviors such as conditional visibility and validation of fields based on user interactions or specific conditions.
- **Theme Customization**: Supports light and dark modes, and facilitates the creation of custom themes via a theme provider, allowing for seamless integration into various design systems.

## Installation

To start using `@adimis/react-schema-form`, follow these steps:

1. Install the package via npm:

   ```bash
   npm install @adimis/react-schema-form
   ```

2. Import the necessary CSS for styling if you are using the ShadcnForm Component:
   ```tsx
   import "@adimis/react-schema-form/dist/style.css";
   ```

These steps ensure that all the necessary dependencies and styles are set up for the component to function and look correctly in your application.

## Usage

Below is an example of how to use `@adimis/react-schema-form` in a React or NextJs application:

```tsx
"use client";

import React from "react";
import "@adimis/react-schema-form/dist/style.css";
import { ShadcnForm } from "@adimis/react-schema-form";
import {
  IFieldSchema,
  IShadcnSchemaFormProps,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ThemeColors,
} from "@adimis/react-schema-form";
import { z } from "zod";

interface SignUp {
  username: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  gender: string;
}

const defaultThemeColors: ThemeColors = {
  root: {
    background: "0 0% 100%",
    foreground: "0 0% 3.9%",
    card: "0 0% 100%",
    "card-foreground": "0 0% 3.9%",
    popover: "0 0% 100%",
    "popover-foreground": "0 0% 3.9%",
    primary: "0 72.2% 50.6%",
    "primary-foreground": "0 85.7% 97.3%",
    secondary: "0 0% 96.1%",
    "secondary-foreground": "0 0% 9%",
    muted: "0 0% 96.1%",
    "muted-foreground": "0 0% 45.1%",
    accent: "0 0% 96.1%",
    "accent-foreground": "0 0% 9%",
    destructive: "0 84.2% 60.2%",
    "destructive-foreground": "0 0% 98%",
    border: "0 0% 89.8%",
    input: "0 0% 89.8%",
    ring: "0 72.2% 50.6%",
    radius: "1rem",
  },
  dark: {
    background: "0 0% 3.9%",
    foreground: "0 0% 98%",
    card: "0 0% 3.9%",
    "card-foreground": "0 0% 98%",
    popover: "0 0% 3.9%",
    "popover-foreground": "0 0% 98%",
    primary: "0 72.2% 50.6%",
    "primary-foreground": "0 85.7% 97.3%",
    secondary: "0 0% 14.9%",
    "secondary-foreground": "0 0% 98%",
    muted: "0 0% 14.9%",
    "muted-foreground": "0 0% 63.9%",
    accent: "0 0% 14.9%",
    "accent-foreground": "0 0% 98%",
    destructive: "0 62.8% 30.6%",
    "destructive-foreground": "0 0% 98%",
    border: "0 0% 14.9%",
    input: "0 0% 14.9%",
    ring: "0 72.2% 50.6%",
  },
};

const schema: IFieldSchema<SignUp>[] = [
  {
    key: "username",
    title: "Username",
    description: "Enter your desired username.",
    autoComplete: "username",
    type: "text",
    placeholder: "Your username",
    defaultValue: "",
    validations: z
      .string()
      .min(1, "Username is required")
      .max(20, "Username must not exceed 20 characters"),
  },
  {
    key: "email",
    title: "Email",
    description: "Enter your email address.",
    autoComplete: "email",
    type: "email",
    placeholder: "Your email",
    defaultValue: "",
    validations: z
      .string()
      .email("Enter a valid email address")
      .min(1, "Email is required"),
  },
  {
    key: "gender",
    type: "select",
    options: [
      {
        label: "Male",
        value: "male",
      },
      {
        label: "Female",
        value: "female",
      },
    ],
    defaultValue: "male",
    placeholder: "Your gender",
    render: (formItem, field) => (
      <Select disabled={formItem.disabled} {...field}>
        <SelectTrigger>
          <SelectValue placeholder={formItem.placeholder || "Select option"} />
        </SelectTrigger>
        <SelectContent position="popper">
          {formItem.options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
  {
    key: "address",
    title: "Address",
    description: "Enter your full address.",
    autoComplete: "address-line1",
    type: "text",
    placeholder: "Your address",
    defaultValue: "",
    validations: z.string().min(10, "Address should be at least 10 characters"),
  },
  {
    key: "phone",
    title: "Phone",
    description: "Enter your phone number with country code.",
    autoComplete: "tel",
    type: "tel",
    placeholder: "+1234567890",
    defaultValue: "",
    validations: z
      .string()
      .regex(/^\+?(\d.*){10,}$/, "Enter a valid phone number"),
  },
  {
    key: "password",
    title: "Password",
    description: "Enter a strong password.",
    autoComplete: "new-password",
    type: "password",
    placeholder: "Your password",
    defaultValue: "",
    validations: z
      .string()
      .min(8, "Password should be at least 8 characters")
      .max(20, "Password must not exceed 20 characters"),
    displayConditions: [
      {
        dependentField: "email",
        dependentFieldValue: "admin@adimis.in",
        operator: "===",
      },
    ],
    removeValidationConditions: [
      {
        dependentField: "email",
        dependentFieldValue: "admin@adimis.in",
        operator: "!==",
      },
    ],
  },
];

const schemaFormProps: IShadcnSchemaFormProps<SignUp> = {
  formName: "example-form",
  card: true,
  schema: schema,
  theme: "dark",
  themeColors: defaultThemeColors,
  persistFormResponse: "sessionStorage",
  devTools: true,
  defaultValues: {
    email: "adimis.ai.001@gmail.com",
    phone: "919625183597",
  },
  onChange: (formResponse, fieldValidations, canIgnoreErrors) =>
    console.log(
      "Form OnChange: ",
      formResponse,
      fieldValidations,
      canIgnoreErrors
    ),
  onSubmit: (values) =>
    console.log(
      "On Submit Example Form Response: ",
      JSON.stringify(values, null, 4)
    ),
  onInvalidSubmit: (values) =>
    console.log(
      "On Submit Invalid Example Form Response: ",
      JSON.stringify(values, null, 4)
    ),
};

const Form = () => {
  return <ShadcnForm {...schemaFormProps} />;
};

export default Form;
```

## Contributing

Contributions are welcome! Please see the repository's issues page for pending features and bugs. Submit pull requests to the repository at [GitHub](https://github.com/AdimisDev/react-schema-form).

## License

This project is licensed under the GNU General Public License v3.0. Please see the [LICENSE](https://github.com/AdimisDev/react-schema-form/blob/main/LICENSE) file for more details.

## More Information

For more details, please visit the [project homepage](https://github.com/AdimisDev/react-schema-form).

This README provides a comprehensive guide for developers looking to utilize `@adimis/react-schema-form` in their projects, covering installation, basic usage, and features.
