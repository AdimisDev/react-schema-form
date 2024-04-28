import { ISchemaForm } from "@/components/SchemaForm/SchemaForm.interface";
import { Button } from "@/components/ui/button";

export const schemaFormProps: ISchemaForm = {
  formName: "example-form",
  panel: true,
  schema: [
    {
      key: "password",
      title: "Password",
      helpText: "Enter your password",
      type: "password",
      placeholder: "Enter your password",
      defaultValue: "123",
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
      title: "Username",
      helpText: "Enter your username",
      type: "text",
      placeholder: "Enter your username",
      defaultValue: "",
      disabled: false,
      validations: [
        {
          type: "required",
          message: "Username is required",
        },
        {
          type: "minLength",
          value: 6,
          message: "Minimum length is 6 characters",
        },
        {
          type: "maxLength",
          value: 10,
          message: "Maximum length is 10 characters",
        },
      ],
    },
    {
      key: "email",
      title: "Email",
      helpText: "Enter your email",
      type: "email",
      placeholder: "Enter your email",
      defaultValue: "",
      disabled: false,
      validations: [
        {
          type: "required",
          message: "Email is required, please enter a valid email",
        },
        {
          type: "minLength",
          value: 3,
          message: "Email must be at least 3 characters long",
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
      validations: [
        {
          type: "required",
          message: "Address is required",
        },
      ],
    },
    {
      key: "phone",
      title: "Phone Number",
      helpText: "Enter your phone number",
      type: "tel",
      placeholder: "Enter your phone number",
      defaultValue: "",
      disabled: false,
      validations: [
        {
          type: "required",
          message: "Phone number is required",
        },
      ],
    },
  ],
  // multiStepFormSteps: {
  //   stage_1: {
  //     stageLabel: "Stage 1",
  //     fields: ["username", "password"],
  //   },
  //   stage_2: {
  //     stageLabel: "Stage 2",
  //     fields: ["email"],
  //   },
  //   stage_3: {
  //     stageLabel: "Stage 3",
  //     fields: ["address", "phone"],
  //   },
  // },
  persistFormResponse: "sessionStorage",
  width: "100%",
  devTools: true,
  onChange: (formResponse, fieldValidations) =>
    console.log("Form OnChange: ", formResponse, fieldValidations),
  onSubmit: (values) =>
    console.log("Example Form Response: ", JSON.stringify(values)),
  header: <h2 className="text-3xl font-bold text-left">Example Form</h2>,
  renderButtons: (formData, handleSubmit) => {
    const buttons: React.ReactNode[] = [];

    buttons.push(
      <Button
        key="With Validation"
        onClick={() =>
          handleSubmit((formData) =>
            console.log("With Validation:", formData)
          )()
        }
        className="w-full"
      >
        Okay
      </Button>
    );

    if (Object.keys(formData).length > 0) {
      buttons.push(
        <Button
          key="reset"
          onClick={() => console.log("Form data reset", formData)}
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
        defaultValue: true,
        title: "Accept terms and conditions",
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
