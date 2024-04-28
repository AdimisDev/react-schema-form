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
  key: string;
  title?: string;
  description?: string;
  helpText?: string;
  type?:
    | React.HTMLInputTypeAttribute
    | "textarea"
    | "select"
    | "multi-select"
    | "radio group"
    | "boolean";
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
  seperator?: boolean; // TODO
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

export interface SchemaFormFooterProps {
  form: UseFormReturn<Record<string, any>, any, undefined>;
  formResponse: Record<string, any>;
  formKey?: string | number;
  submitButtonLoading: boolean;
  links?: ISchemaForm["links"];
  renderFooter?: ISchemaForm["renderFooter"];
  renderButtons?: ISchemaForm["renderButtons"];
  submitButton: ISchemaForm["submitButton"];
  checkboxes?: ISchemaForm["checkboxes"];
}

export interface ISchemaForm {
  // Schema Form Settings
  formName: string;
  schema: IFieldSchema[];
  persistFormResponse?: "localStorage" | "sessionStorage" | undefined;
  devTools?: boolean;
  showValidationErrors?: boolean;

  // Schema Form Callbacks
  onSubmit: (values: Record<string, any>) => Promise<void> | void;
  onChange?: (
    formResponse: Record<string, any>,
    fieldValidations: FieldErrors<Record<string, any>>
  ) => void;

  // Props for schema form styling and layouting
  panel?: boolean;
  width?: string | number;
  className?: string;
  multiStepFormSteps?: Record<
    string,
    {
      stageLabel?: string;
      fields?: IFieldSchema["key"][];
    }
  >; // TODO:

  // Props for schema form header and footer
  header?: React.ReactNode;
  links?: React.ReactNode;
  submitButton?: {
    submitButtonClassName?: string;
    submitButtonVarient?: ButtonProps["variant"];
    submitButtonName?: string | ReactNode;
    hideSubmit?: boolean;
  };
  renderButtons?: (
    formData: Record<string, any>,
    handleSubmit: UseFormHandleSubmit<Record<string, any>, undefined>
  ) => React.ReactNode[];
  checkboxes?: {
    className?: string;
    items: IFieldSchema[];
  };
  renderFooter?: (formResponse: Record<string, any>) => React.ReactNode;
}
