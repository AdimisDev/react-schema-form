import { ISchemaForm } from "@/components/SchemaForm/SchemaForm.interface";
import { Button } from "@/components/ui/button";

export const schemaFormProps: ISchemaForm = {
  formName: "example-form",
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
      type: "text",
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
  persistFormResponse: "sessionStorage",
  width: "100%",
  devTools: true,
  onSubmit: (values) =>
    console.log("Example Form Response: ", JSON.stringify(values)),
  onValidationError: (errors) =>
    console.error("Form Validation Error: ", JSON.stringify(errors, null, 4)),
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
    aboveButtons: false,
    className: "flex justify-between items-center mt-5",
    fluid: true,
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
};
