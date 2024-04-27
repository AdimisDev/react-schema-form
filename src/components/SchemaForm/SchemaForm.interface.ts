import { ReactNode } from "react";
import { FieldErrors } from "react-hook-form";
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

export interface INewFieldSchema {
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
}

export interface INewSchemaForm {
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
