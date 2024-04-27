import SchemaForm from "./components/SchemaForm/SchemaForm";
import { ISchemaForm } from "./components/SchemaForm/SchemaForm.interface";

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

const App = () => {
  return <SchemaForm {...schemaFormProps} />;
};

export default App;
