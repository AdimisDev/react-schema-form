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
