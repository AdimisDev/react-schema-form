import React, { HTMLInputAutoCompleteAttribute, ReactNode } from "react";
import {
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormReturn,
} from "react-hook-form";
import { ButtonProps } from "../ui/button";
import { z } from "zod";

export interface FieldProps {
  field: ControllerRenderProps<FieldValues, string>;
  formItem: IFieldSchema;
  loading?: boolean;
}

export interface IFieldSchema {
  key: string;
  title?: string;
  description?: string;
  helpText?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
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
  validations?: z.ZodType<any, any>;
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
  displayConditions?: {
    dependentField: string;
    operator: "===" | "!==" | "<" | "<=" | ">" | ">=";
    dependentFieldValue: string;
    relation?: "and";
  }[];
  removeValidationConditions?: {
    dependentField: string;
    operator: "===" | "!==" | "<" | "<=" | ">" | ">=";
    dependentFieldValue: string;
    relation?: "and";
  }[];
}

export interface CustomFieldProps {
  field: ControllerRenderProps<FieldValues, string>;
  formItem: IFieldSchema;
  loading?: boolean;
}

export interface SchemaFormFooterProps {
  form: UseFormReturn<Record<string, any>, any, undefined>;
  formResponse: Record<string, any>;
  formKey: string;
  submitButtonLoading: boolean;
  links?: ISchemaFormProps["links"];
  renderFooter?: ISchemaFormProps["renderFooter"];
  renderButtons?: ISchemaFormProps["renderButtons"];
  submitButton: ISchemaFormProps["submitButton"];
  checkboxes?: ISchemaFormProps["checkboxes"];
  canRemoveValidationFor?: Record<string, boolean>;
  footerClassName?: ISchemaFormProps["footerClassName"];
}

export interface ISchemaFormProps {
  // Schema Form Settings
  formName: string;
  description?: string;
  schema: IFieldSchema[];
  persistFormResponse?: "localStorage" | "sessionStorage" | undefined;
  devTools?: boolean;
  showValidationErrors?: boolean;

  // Schema Form Callbacks
  onSubmit?: (values: Record<string, any>) => Promise<void> | void;
  onChange?: (
    formResponse: Record<string, any>,
    formErrors: FieldErrors<Record<string, any>>,
    canRemoveValidationFor: Record<string, boolean>
  ) => void;

  // Props for schema form styling and layouting
  panel?: boolean;
  theme?: Theme;
  themeColors?: ThemeColors;
  width?: string | number;
  formClassName?: string;
  fieldsLayoutClassName?: string;
  footerClassName?: string;

  // Props for schema form header and footer
  renderHeader?: (
    CardTitle: React.ForwardRefExoticComponent<
      React.HTMLAttributes<HTMLHeadingElement> &
        React.RefAttributes<HTMLParagraphElement>
    >,
    CardDescription: React.ForwardRefExoticComponent<
      React.HTMLAttributes<HTMLParagraphElement> &
        React.RefAttributes<HTMLParagraphElement>
    >
  ) => React.ReactNode;
  links?: React.ReactNode;
  checkboxes?: {
    className?: string;
    items: IFieldSchema[];
  };
  submitButton?: {
    submitButtonClassName?: string;
    submitButtonVarient?: ButtonProps["variant"];
    submitButtonName?: string | ReactNode;
    hideSubmit?: boolean;
    disabledSubmit?: boolean;
    loading?: boolean;
  };
  renderButtons?: (
    formResponse: Record<string, any>,
    handleSubmit: UseFormHandleSubmit<Record<string, any>, undefined>,
    formErrors: FieldErrors<Record<string, any>>,
    emptyFormPersistedData: () => void,
    canRemoveValidationFor?: Record<string, boolean>
  ) => React.ReactNode[];
  renderFooter?: (
    formResponse: Record<string, any>,
    handleSubmit: UseFormHandleSubmit<Record<string, any>, undefined>,
    formErrors: FieldErrors<Record<string, any>>,
    emptyFormPersistedData: () => void,
    canRemoveValidationFor?: Record<string, boolean>
  ) => React.ReactNode;

  validationMode?:
    | "onBlur"
    | "onChange"
    | "onSubmit"
    | "onTouched"
    | "all"
    | undefined;
  reValidateMode?: "onBlur" | "onChange" | "onSubmit" | undefined;
}

export interface IMultiStepSchemaFormProps extends ISchemaFormProps {
  multiStepFormSteps?: Record<
    string,
    {
      stageLabel?: string;
      fields?: IFieldSchema["key"][];
    }
  >;
}

// SECTION: Theme Interfaces

export type Theme = "dark" | "light" | "system";

export interface ThemeColors {
  root: {
    background?: string;
    foreground?: string;
    card?: string;
    "card-foreground"?: string;
    popover?: string;
    "popover-foreground"?: string;
    primary?: string;
    "primary-foreground"?: string;
    secondary?: string;
    "secondary-foreground"?: string;
    muted?: string;
    "muted-foreground"?: string;
    accent?: string;
    "accent-foreground"?: string;
    destructive?: string;
    "destructive-foreground"?: string;
    border?: string;
    input?: string;
    ring?: string;
    radius?: string;
  };
  dark: ThemeColors["root"];
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  themeColors?: ThemeColors;
}

export interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}