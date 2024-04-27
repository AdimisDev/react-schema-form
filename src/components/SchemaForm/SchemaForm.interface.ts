import React, { ReactNode } from "react";
import {
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormReturn,
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
    | "boolean"
    | "time";
  placeholder?: string;
  defaultValue?: string | number | boolean | Array<any>;
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
  showValidationErrors?: boolean;
  loading?: boolean;
}

export interface ISchemaForm {
  formName: string;
  schema: IFieldSchema[];
  width?: string | number;
  multiStepFormSteps?: IFieldSchema["key"][];
  persistFormResponse?: "localStorage" | "sessionStorage" | undefined;
  submitButton?: {
    submitButtonClassName?: string;
    submitButtonVarient?: ButtonProps["variant"];
    submitButtonName?: string | ReactNode;
    hideSubmit?: boolean;
  };
  links?: React.ReactNode;
  checkboxes?: {
    aboveButtons?: boolean;
    aboveLinks?: boolean;
    className?: string;
    fluid?: boolean;
    items: IFieldSchema[];
  };
  onSubmit: (values: Record<string, any>) => Promise<void> | void;
  onChange?: (
    formResponse: Record<string, any>,
    fieldValidations: FieldErrors<{ [x: string]: any }>
  ) => void;
  onValidationError?: (errors: any) => void;
  renderButtons?: (
    formData: Record<string, any>,
    handleSubmit: UseFormHandleSubmit<Record<string, any>, undefined>
  ) => React.ReactNode[];
  fluid?: boolean;
  panel?: boolean;
  centered?: boolean;
  devTools?: boolean;
  showValidationErrors?: boolean;
  className?: string;
  header?: React.ReactNode;
  renderFooter?: (formResponse: Record<string, any>) => React.ReactNode;
}

export interface SchemaFormFooterProps {
  formResponse: Record<string, any>;
  submitButtonLoading?: boolean;
  submitButton?: ISchemaForm["submitButton"];
  renderButtons?: ISchemaForm["renderButtons"];
  setSubmitButtonLoading: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<Record<string, any>, any, undefined>;
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
}
