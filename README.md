# @adimis/react-schema-form

Effortlessly create dynamic forms in React applications with @adimis/react-schema-form. This library leverages modern technologies to provide a robust solution for building and validating forms with ease.

## Features

- **Dynamic Form Generation**: Automatically generate forms based on a schema definition.
- **Validation with Zod**: Utilize Zod to set up complex validation rules for your forms.
- **Customizable Styling**: Style your forms with Shadcn UI to ensure they match your application's design.
- **TypeScript Support**: Benefit from TypeScript's static typing to catch errors at compile time.
- **DevTools**: Debug forms with built-in development tools to streamline troubleshooting.

## Tech Stack

- React Hook Form
- Shadcn UI
- Zod for validation
- React
- TypeScript
- Custom Hooks
- Storybook
- Vite as the build tool

## Package Size Breakdown

The `@adimis/react-schema-form` package is optimized to ensure functionality while maintaining a manageable bundle size. Here's a breakdown of the contents and their file sizes:

- **Source Code and TypeScript Definitions**: The main functionality of the library, including all components and TypeScript definitions, takes up the bulk of the package size.
  - `dist/index.es.js` (547.6kB) and its source map (2.0MB)
  - `dist/index.umd.js` (367.9kB) and its source map (1.9MB)
- **Documentation and Examples**: Documentation files are included to help you understand and implement the library effectively.
  - Documentation HTML files (`docs/`) and assets like scripts and styles that total approximately 250kB.
- **Styles**: Essential CSS for default styling is provided.
  - `dist/style.css` (21.0kB)
- **Images and Assets**: Includes the logo which contributes to the visual representation of the library in docs and README.
  - `dist/adimis-logo-dark.png` (19.3kB)

### Note on Dynamic Imports

When you use specific components like `SchemaForm` or `MultiStepForm`, the actual size impacting your application will be significantly less, as not all parts of the library are loaded at once. This ensures that your application remains lightweight and only loads what is necessary.

## Installation

### Step 1: Install the package

```bash
npm install @adimis/react-schema-form
```

### Step 2: Import required styles

To use the default styling provided by the package, import the stylesheet in your project:

```typescript
import "@adimis/react-schema-form/dist/style.css";
```

## Usage

Below is an example of how to use the Schema Form in your React application.

### Example Code

```tsx
import React from "react";
import SchemaForm, { ISchemaFormProps } from "@adimis/react-schema-form";
import { z } from "zod";
import "@adimis/react-schema-form/dist/style.css";
import { Button } from "./components/ui/button";

const App = () => {
  const formValidations = {
    username: z
      .string()
      .min(1, "Username is required")
      .max(20, "Username must not exceed 20 characters"),
    email: z
      .string()
      .email("Enter a valid email address")
      .min(1, "Email is required"),
    address: z
      .string()
      .min(10, "Address should be at least 10 characters")
      .min(1, "Address is required"),
    phone: z
      .string()
      .regex(/^\+?(\d.*){10,}$/, "Enter a valid phone number")
      .min(1, "Phone number is required"),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters")
      .max(20, "Password must not exceed 20 characters"),
    terms: z.boolean(),
  };

  const schemaFormProps: ISchemaFormProps = {
    formName: "example-form",
    panel: true,
    schema: [
      {
        key: "username",
        title: "Username",
        helpText: "Enter your username",
        autoComplete: "username",
        type: "text",
        placeholder: "Enter your username",
        defaultValue: "",
        disabled: false,
        validations: formValidations.username,
      },
      {
        key: "email",
        title: "Email",
        helpText: "Enter your email",
        type: "email",
        placeholder: "Enter your email",
        defaultValue: "",
        disabled: false,
        validations: formValidations.email,
      },
      {
        key: "password",
        title: "Password",
        helpText: "Enter your password",
        type: "password",
        placeholder: "Enter your password",
        defaultValue: "",
        autoComplete: "new-password",
        disabled: false,
        validations: formValidations.password,
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
      {
        key: "address",
        title: "Address",
        helpText: "Enter your address",
        type: "text",
        placeholder: "1234 Main St",
        defaultValue: "",
        disabled: false,
        validations: formValidations.address,
      },
      {
        key: "phone",
        title: "Phone Number",
        helpText: "Enter your phone number",
        type: "tel",
        placeholder: "Enter your phone number",
        defaultValue: "",
        disabled: false,
        validations: formValidations.phone,
      },
    ],
    persistFormResponse: "sessionStorage",
    width: "100%",
    devTools: true,
    onChange: (formResponse, fieldValidations, canIgnoreErrors) =>
      console.log(
        "Form OnChange: ",
        formResponse,
        fieldValidations,
        canIgnoreErrors
      ),
    onSubmit: (values) =>
      console.log("On Submit Example Form Response: ", JSON.stringify(values)),
    header: <h2 className="text-3xl font-bold text-left">Example Form</h2>,
    renderButtons: (formData, handleSubmit) => {
      const buttons: React.ReactNode[] = [];

      buttons.push(
        <Button
          key="External Submit"
          onClick={() =>
            handleSubmit((formData) =>
              console.log("External Submit With Validation:", formData)
            )()
          }
          className="w-full"
        >
          External Submit
        </Button>
      );

      if (Object.keys(formData).length > 0) {
        buttons.push(
          <Button
            key="reset"
            onClick={() =>
              handleSubmit((formData) =>
                console.log("External Reset With Validation:", formData)
              )()
            }
            className="w-full"
          >
            Reset
          </Button>
        );
      }

      if (formData.email && formData.email.trim()) {
        buttons.push(
          <Button
            key="special"
            onClick={() => console.log("Special action for email", formData)}
            className="w-full"
          >
            Special Email Action
          </Button>
        );
      }

      buttons.push(
        <Button
          key="something"
          onClick={() => console.log("Okay:", formData)}
          className="w-full"
        >
          Something
        </Button>
      );

      return buttons;
    },
    checkboxes: {
      className: "flex justify-between items-center gap-4 mt-5",
      items: [
        {
          key: "terms",
          title: "Accept terms and conditions",
          validations: formValidations.terms,
          type: "boolean",
        },
        {
          key: "privacy_policy",
          defaultValue: false,
          title: "Accept privacy policies",
        },
        {
          key: "privacy_policy_new",
          defaultValue: false,
          title: "Accept privacy policies",
        },
      ],
    },
    links: (
      <div className="w-full flex justify-between items-center mt-5">
        <a
          href="/"
          className="underline underline-offset-2 cursor-pointer hover:text-black/70"
        >
          Privacy Policy
        </a>
        <a
          href="/"
          className="underline underline-offset-2 cursor-pointer hover:text-black/70"
        >
          Terms and Condition
        </a>
      </div>
    ),
  };

  return <SchemaForm {...schemaFormProps} />;
};

export default App;
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs, features, or improvements.

## License

This project is licensed under the GNU License - see the [LICENSE](https://github.com/AdimisDev/react-schema-table/blob/main/LICENSE) file for details.
