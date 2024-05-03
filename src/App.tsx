"use client";

import React from "react";
import { z } from "zod";
import { Button } from "./components/ui/button";
import { ISchemaFormProps } from "./components/schemaForm/interface";
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
