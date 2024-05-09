"use client";

import { z } from "zod";
// import ShadcnForm from "./components/ShadcnForm";
import {
  IMultiStepShadcnSchemaFormProps,
  IShadcnSchemaFormProps,
  // IShadcnSchemaFormProps,
  ThemeColors,
} from "./form.interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import MultiStepShadcnForm from "./components/MultiStepShadcnForm";
import { Card } from "./components/ui/card";
import ShadcnForm from "./components/ShadcnForm";

interface SignUp {
  username: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  gender: string;
  terms: boolean;
  enums: {
    label: string;
    value: string;
  };
  file: File;
  date: Date;
  year: number;
}

const App = () => {
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

  const schemaFormProps: IShadcnSchemaFormProps<SignUp> = {
    formLabel: "Example Form",
    formSlug: "example-form",
    card: true,
    theme: "dark",
    themeColors: defaultThemeColors,
    formDisabled: false,
    schema: [
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
        title: "Gender",
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
          <Select
            disabled={formItem.disabled}
            value={field.value as string}
            defaultValue={formItem.defaultValue as string}
            onValueChange={(value) => field.onChange(value)}
            autoComplete={formItem.autoComplete}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={formItem.placeholder || "Select option"}
              />
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
        validations: z
          .string()
          .default("male")
          .refine((val) => val === "male", {
            message: "Only 'Male' is a valid option",
          }),
      },
      {
        key: "address",
        title: "Address",
        description: "Enter your full address.",
        autoComplete: "address-line1",
        type: "text",
        placeholder: "Your address",
        defaultValue: "",
        validations: z
          .string()
          .min(10, "Address should be at least 10 characters"),
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
    ],
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

  const multiStepschemaFormProps: IMultiStepShadcnSchemaFormProps<SignUp> = {
    formLabel: "Example Form",
    formSlug: "example-form",
    card: true,
    theme: "dark",
    themeColors: defaultThemeColors,
    formDisabled: false,
    multiStepFormSteps: {
      step_1: {
        stageLabel: "Step 1",
        fields: ["username", "email"],
      },
      step_2: {
        stageLabel: "Step 2",
        fields: ["gender", "address"],
      },
      step_3: {
        stageLabel: "Step 3",
        fields: ["phone", "password"],
      },
    },
    schema: [
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
        title: "Gender",
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
          <Select
            disabled={formItem.disabled}
            value={field.value as string}
            defaultValue={formItem.defaultValue as string}
            onValueChange={(value) => field.onChange(value)}
            autoComplete={formItem.autoComplete}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={formItem.placeholder || "Select option"}
              />
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
        validations: z
          .string()
          .default("male")
          .refine((val) => val === "male", {
            message: "Only 'Male' is a valid option",
          }),
      },
      {
        key: "address",
        title: "Address",
        description: "Enter your full address.",
        autoComplete: "address-line1",
        type: "text",
        placeholder: "Your address",
        defaultValue: "",
        validations: z
          .string()
          .min(10, "Address should be at least 10 characters"),
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
    ],
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

  return (
    <Card>
      <MultiStepShadcnForm {...multiStepschemaFormProps} />
      <ShadcnForm {...schemaFormProps} />
    </Card>
  );
};

export default App;
