import { SlotProps } from "@radix-ui/react-slot";
import React from "react";
import { HTMLInputAutoCompleteAttribute } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  DefaultValues,
  UseFormReturn,
  UseFieldArrayProps,
  UseFieldArrayReturn,
  Control,
  SubmitErrorHandler,
  CriteriaMode,
  PathValue,
  ControllerRenderProps,
  DeepPartialSkipArrayKey,
  FieldPath,
  ControllerProps,
} from "react-hook-form";
import { z, ZodTypeAny } from "zod";
import * as LabelPrimitive from "@radix-ui/react-label";

export type ZodSchemaObject<T> = Record<keyof T, ZodTypeAny>;

export interface IFieldSchema<TFieldValues extends FieldValues> {
  key: Path<TFieldValues>;
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
    | "boolean"
    | string;
  placeholder?: string;
  defaultValue?: TFieldValues[Path<TFieldValues>];
  options?: Array<{
    label: string;
    value: TFieldValues[Path<TFieldValues>];
  }>;
  disabled?: boolean;
  validations?: z.ZodType<TFieldValues[Path<TFieldValues>], any>;
  fieldStyle?: React.CSSProperties;
  fieldClassName?: string;
  displayConditions?: {
    dependentField: Path<TFieldValues>;
    operator: "===" | "!==" | "<" | "<=" | ">" | ">=";
    dependentFieldValue: TFieldValues[Path<TFieldValues>];
    relation?: "and";
  }[];
  removeValidationConditions?: {
    dependentField: Path<TFieldValues>;
    operator: "===" | "!==" | "<" | "<=" | ">" | ">=";
    dependentFieldValue: TFieldValues[Path<TFieldValues>];
    relation?: "and";
  }[];
  render?: (
    formItem: IFieldSchema<TFieldValues>,
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>,
    formMethods: UseFormReturn<TFieldValues, any, undefined>,
    useFieldArrayGetter: (props: UseFieldArrayProps) => UseFieldArrayReturn
  ) => React.ReactNode;
}

export type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown
) => Promise<TFieldValues>;

export interface ISchemaFormProps<TFieldValues extends FieldValues> {
  formName: string;
  formDescription?: string;
  schema: IFieldSchema<TFieldValues>[];
  defaultValues?:
    | DefaultValues<TFieldValues>
    | AsyncDefaultValues<TFieldValues>;
  persistFormResponse?: "localStorage" | "sessionStorage" | undefined;
  devTools?: boolean;
  showValidationErrors?: boolean;
  validationMode?:
    | "onBlur"
    | "onChange"
    | "onSubmit"
    | "onTouched"
    | "all"
    | undefined;
  reValidateMode?: "onBlur" | "onChange" | "onSubmit" | undefined;
  criteriaMode?: CriteriaMode;
  formStyle?: React.CSSProperties;
  formClassName?: string;
  onSubmit?: (response: {
    success?: TFieldValues;
    errors?: FieldErrors<TFieldValues>;
  }) => Promise<void> | void;
  onInvalidSubmit?: SubmitErrorHandler<TFieldValues>;
  onChange?: (
    formResponse: DeepPartialSkipArrayKey<TFieldValues>,
    formErrors: FieldErrors<TFieldValues>,
    canRemoveValidationForFields: Record<Path<TFieldValues>, boolean>
  ) => void;
}

export interface FormContextType<TFieldValues extends FieldValues> {
  formTitle: string;
  formKey: string;
  formDescription?: string;
  formFields: IFieldSchema<TFieldValues>[];
  formMethods: UseFormReturn<TFieldValues>;
  visibleFields: Set<Path<TFieldValues>>;
  submitButtonLoading: boolean;
  handleOnSubmit: (values: TFieldValues) => void;
  handleOnInvalidSubmit: (errors: FieldErrors<TFieldValues>) => void;
  useFieldArrayGetter: (props: UseFieldArrayProps) => UseFieldArrayReturn;
  useFormValuesGetter: () => TFieldValues;
  useFieldValuesGetter: <TFieldValues extends FieldValues>(props: {
    name: Path<TFieldValues>;
    control?: Control<TFieldValues> | undefined;
    defaultValue?: TFieldValues[Path<TFieldValues>] | undefined;
    disabled?: boolean | undefined;
  }) => PathValue<TFieldValues, typeof props.name>;
}

export interface IShadcnSchemaFormProps<TFieldValues extends FieldValues>
  extends ISchemaFormProps<TFieldValues> {
  card?: boolean;
  theme?: Theme;
  themeColors?: ThemeColors;
  renderHeader?: (
    formContext: FormContextType<TFieldValues>
  ) => React.ReactNode;
  renderFooter?: (
    formContext: FormContextType<TFieldValues>
  ) => React.ReactNode;
  renderFormFields?: (
    formContext: FormContextType<TFieldValues>,
    FormField: <
      TFieldValues extends FieldValues = FieldValues,
      TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
    >({
      ...props
    }: ControllerProps<TFieldValues, TName>) => React.JSX.Element,
    FormItem: React.ForwardRefExoticComponent<
      React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
    >,
    FormControl: React.ForwardRefExoticComponent<
      Omit<SlotProps & React.RefAttributes<HTMLElement>, "ref"> &
        React.RefAttributes<HTMLElement>
    >,
    FormMessage: React.ForwardRefExoticComponent<
      React.HTMLAttributes<HTMLParagraphElement> &
        React.RefAttributes<HTMLParagraphElement>
    >,
    FormLabel: React.ForwardRefExoticComponent<
      Omit<
        LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>,
        "ref"
      > &
        React.RefAttributes<HTMLLabelElement>
    >,
    FormDescription: React.ForwardRefExoticComponent<
      React.HTMLAttributes<HTMLParagraphElement> &
        React.RefAttributes<HTMLParagraphElement>
    >
  ) => React.ReactNode;
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
