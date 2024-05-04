"use client";

import React from "react";
import { z } from "zod";
import { Button } from "./components/ui/button";
import { ISchemaFormProps, ThemeColors } from "./components/schemaForm/interface";
import { SchemaForm } from "./components/schemaForm";

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

  const schemaFormProps: ISchemaFormProps = {
    formName: "example-form",
    panel: true,
    theme: "light",
    themeColors: defaultThemeColors,
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
        autoComplete: "email",
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
        autoComplete: "current-password",
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
        autoComplete: "address-level1",
        type: "text",
        placeholder: "1234 Main St",
        defaultValue: "",
        disabled: false,
        validations: formValidations.address,
      },
      {
        key: "phone",
        title: "Phone Number",
        autoComplete: "tel",
        helpText: "Enter your phone number",
        type: "tel",
        placeholder: "Enter your phone number",
        defaultValue: "",
        disabled: false,
        validations: formValidations.phone,
      },
      {
        key: "date",
        title: "Date",
        helpText: "Enter your birth date",
        type: "date",
        placeholder: "Enter your birth date",
        disabled: false,
      },
      {
        key: "select",
        title: "Select",
        helpText: "Enter your gender",
        type: "select",
        placeholder: "Enter your gender",
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
        disabled: false,
      },
      {
        key: "username2",
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
        key: "email2",
        title: "Email",
        helpText: "Enter your email",
        autoComplete: "email",
        type: "email",
        placeholder: "Enter your email",
        defaultValue: "",
        disabled: false,
        validations: formValidations.email,
      },
      {
        key: "password2",
        title: "Password",
        helpText: "Enter your password",
        type: "password",
        placeholder: "Enter your password",
        defaultValue: "",
        autoComplete: "current-password",
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
        key: "address2",
        title: "Address",
        helpText: "Enter your address",
        autoComplete: "address-level1",
        type: "text",
        placeholder: "1234 Main St",
        defaultValue: "",
        disabled: false,
        validations: formValidations.address,
      },
      {
        key: "phone2",
        title: "Phone Number",
        autoComplete: "tel",
        helpText: "Enter your phone number",
        type: "tel",
        placeholder: "Enter your phone number",
        defaultValue: "",
        disabled: false,
        validations: formValidations.phone,
      },
      {
        key: "date2",
        title: "Date",
        helpText: "Enter your birth date",
        type: "date",
        placeholder: "Enter your birth date",
        disabled: false,
      },
      {
        key: "select2",
        title: "Select",
        helpText: "Enter your gender",
        type: "select",
        placeholder: "Enter your gender",
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
        disabled: false,
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
    renderButtons: (formData, handleSubmit) => {
      const buttons: React.ReactNode[] = [];

      buttons.push(
        <Button
          variant={"primary"}
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

      if (formData.email && formData.email.trim()) {
        buttons.push(
          <Button
            variant={"outline"}
            key="special"
            onClick={() => console.log("Special action for email", formData)}
            className="w-full"
          >
            Special Email Action
          </Button>
        );
      }

      if (Object.keys(formData).length > 0) {
        buttons.push(
          <Button
            variant={"destructive"}
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
