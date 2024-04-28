# Schema Form

## Tech Stack

- React Hook Form
- Shadcn UI
- Zod
- React
- TypeScript
- useHooks
- Storybook
- Vite

## Technical Features

- [x] State Persist: By default persist the form response in localstorage, and can switch between sessionStorage or nothing using `persistFormResponse: 'localStorage' | 'sessionStorage' | null` of `ISchemaFormProps`.
- [x] Predefined Field Zod Validation: Dynamically generate validation schema for all the predefined field based on provided `validations` of `IFieldSchema` for zodResolver to be used as a resolver for useForm of React Hook Form.
- [x] Render Custom Fields: Render custom form fields using a render prop.
- [x] Multi Step Form: Pass the `steps: string[]` prop in ISchemaFormProps split the form fields into groups and present the form as a multi step form, with each step having it's own group.
- [x] Panel: Form inside a Card.
- [x] Custom Field Zod Validation: Dynamically generate validation schema for field rendered using `render` prop of `IFieldSchema` based on provided `validations` of `IFieldSchema` for zodResolver to be used as a resolver for useForm of React Hook Form.
- [x] Conditional Field Display: Display the field only if a certain condition is met.
- [x] Conditional Validation Check Toggle: Toggle the validation check for a field, if defined, based on whether a certain condition is met.

- [ ] FIXME: Checbox validation not working

### Form Fields

All fields include all functionalities from either the rsuite or any popular package based on the field type.

- [ ] Input
- [ ] Input Number
- [ ] OTP Input
- [ ] Textarea Input
- [ ] Select Picker
- [ ] Radio Group
- [ ] Toggle
- [ ] Checkbox
- [ ] File Uploader
- [ ] Date Picker
- [ ] Date Range Picker
- [ ] Captcha/ReCaptcha
- [ ] Color Picker
- [ ] Tag Picker
- [ ] Slider
<!-- - [ ] Currency Picker
- [ ] Phone Number Picker
- [ ] Time Picker
- [ ] Time Range Picker
- [ ] Map Picker
- [ ] Credit Card Picker -->

### Validation Types

### Props

```ts
import { ReactNode } from "react";
import {
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import { ButtonProps } from "../ui/button";

export interface IFieldSchema {
  key?: string;
  title?: string;
  helpText?: string;
  type?:
    | "password"
    | "string"
    | "email"
    | "textarea"
    | "select"
    | "multi-select"
    | "radio group"
    | "file"
    | "boolean"
    | "range"
    | "date"
    | "time";
  placeholder?: string;
  defaultValue?: string | Array<any>;
  options?: Array<{
    label: string;
    value: string;
  }>;
  disabled?: boolean;
  validations?: Array<{
    type: "required" | "minLength" | "maxLength" | "optional";
    message?: string;
    value?: number | string;
  }>;
  seperator?: boolean;
  // `render` prop usage example
  /*
  Example-1:
    render: (formItem, field, loading) => (
      <Input
        type={formItem.type}
        disabled={formItem.disabled || loading}
        placeholder={formItem.placeholder}
        {...field}
        onChange={(e) => field.onChange(e.target.value)}
      />
    )

  Example-2:

    render: (formItem, field, loading) => (
      <Select
        disabled={formItem.disabled || loading}
        defaultValue={field.value}
        onValueChange={field.onChange}
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
    )
  */
  render?: (
    formItem: IFieldSchema,
    field: ControllerRenderProps<FieldValues, string>,
    loading?: boolean
  ) => React.ReactNode;
}

export interface CustomFieldProps {
  field: ControllerRenderProps<FieldValues, string>;
  formItem: IFieldSchema;
  loading?: boolean;
}

export interface ISchemaFormProps {
  schema: IFieldSchema[];
  settings?: {
    formName?: string;
    devTools?: boolean;
    defaultFormValues?: Record<string, any>;
    loading?: boolean;
    className?: string;
    centered?: boolean;
  };
  callbacks?: {
    onSubmit: (values: Record<string, any>) => Promise<void> | void;
    onChange?: (
      formResponse: Record<string, any>,
      fieldValidations: FieldErrors<{ [x: string]: any }>
    ) => void;
  };
  footer?: {
    submit?: {
      submitButtonClassName?: string;
      submitButtonVarient?: ButtonProps["variant"];
      submitButtonName?: string | ReactNode;
      disableSubmit?: boolean;
    };
    buttons?: React.ReactNode[];
    checkboxes?: {
      text: string;
      default: boolean;
      onChange: (value: boolean) => void;
    }[];
    links?: React.ReactNode[];
  };
}
```
