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
  description?: string;
  helpText?: string;
  type?:
    | "password"
    | "text"
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
  // render prop usage example
  /*
  Example-1:
  ```typescript
    render: (formItem, field, loading) => (
      <Input
        type={formItem.type}
        disabled={formItem.disabled || loading}
        placeholder={formItem.placeholder}
        {...field}
        onChange={(e) => field.onChange(e.target.value)}
      />
    )
  ```

  Example-2:
  ```typescript
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
  ```
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

export interface ISchemaForm {
  schema: IFieldSchema[];
  formName?: string;
  devTools?: boolean;
  className?: string;
  centered?: boolean;
  disableSubmit?: boolean;
  defaultFormValues?: Record<string, any>;
  submitButtonClassName?: string;
  submitButtonVarient?: ButtonProps["variant"];
  submitButtonName?: string | ReactNode;
  loading?: boolean;
  onSubmit: (values: Record<string, any>) => Promise<void> | void;
  onChange?: (
    formResponse: Record<string, any>,
    fieldValidations: FieldErrors<{ [x: string]: any }>
  ) => void;
}

export interface INewSchemaForm {
  formName?: string;
  schema: IFieldSchema[];
  height?: string | number;
  width?: string | number;
  multiStepFormSteps?: IFieldSchema["key"][];
  persistFormResponse: "localStorage" | "sessionStorage" | null;
  submitButton?: {
    submitButtonClassName?: string;
    submitButtonVarient?: ButtonProps["variant"];
    submitButtonName?: string | ReactNode;
    hideSubmit?: boolean;
  };
  buttons?: React.ReactNode[];
  links?: React.ReactNode[];
  checkboxes?: {
    text: string;
    default: boolean;
    onChange: (value: boolean) => void;
  }[];
  onSubmit: (values: Record<string, any>) => Promise<void> | void;
  onChange?: (
    formResponse: Record<string, any>,
    fieldValidations: FieldErrors<{ [x: string]: any }>
  ) => void;
  onValidationError?: () => void;
  fluid?: boolean;
  panel?: boolean;
  loading?: boolean;
  centered?: boolean;
  devTools?: boolean;
  showValidationErrors?: boolean;
}
