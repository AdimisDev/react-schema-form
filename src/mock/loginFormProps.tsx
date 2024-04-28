import { ISchemaFormProps } from "@/interfaces/SchemaForm.interface";
import { z } from "zod";

const formValidations = {
  email: z
    .string()
    .email("Enter a valid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password should be at least 8 characters")
    .max(20, "Password must not exceed 20 characters"),
  terms: z.boolean(),
};

export const loginFormProps: ISchemaFormProps = {
  formName: "login-form",
  header: <h2 className="text-3xl font-bold text-left">Login Form</h2>,
  schema: [
    {
      key: "email",
      title: "Email",
      helpText: "Enter your email",
      type: "email",
      placeholder: "Enter your email",
      defaultValue: "abc@gmail.com",
      disabled: false,
      validations: formValidations.email,
    },
    {
      key: "password",
      title: "Password",
      helpText: "Enter your password",
      type: "password",
      placeholder: "Enter your password",
      defaultValue: "123456",
      disabled: false,
      validations: formValidations.password,
    },
  ],
  onSubmit: (values) =>
    console.log("Login Form Response: ", JSON.stringify(values)),
};
