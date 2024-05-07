import React, { Context, createContext, useContext } from "react";
import { FieldValues, FormProvider } from "react-hook-form";
import { FormContextType, ISchemaFormProps } from "@/form.interface";
import { useSchemaForm } from "@/hooks/useSchemaForm";

const FormContext = createContext<FormContextType<any> | null>(null);

const SchemaFormProvider = <TFieldValues extends FieldValues>(
  props: ISchemaFormProps<TFieldValues> & { children: React.ReactNode }
): JSX.Element => {
  const {
    formTitle,
    formKey,
    formDescription,
    formFields,
    formMethods,
    visibleFields,
    submitButtonLoading,
    handleOnSubmit,
    handleOnInvalidSubmit,
    useFieldArrayGetter,
    useFormValuesGetter,
    useFieldValuesGetter,
  } = useSchemaForm(props);

  return (
    <FormContext.Provider
      value={{
        formTitle,
        formKey,
        formDescription,
        formFields,
        formMethods,
        visibleFields,
        submitButtonLoading,
        handleOnSubmit,
        handleOnInvalidSubmit,
        useFieldArrayGetter,
        useFormValuesGetter,
        useFieldValuesGetter,
      }}
    >
      <FormProvider {...formMethods}>{props.children}</FormProvider>
    </FormContext.Provider>
  );
};

export function useSchemaFormContext<TFieldValues extends FieldValues>() {
  const context = useContext(
    FormContext as Context<FormContextType<TFieldValues>>
  );
  if (!context) {
    throw new Error("useSchemaFormContext must be used within a FormProvider");
  }
  return context;
}

export default SchemaFormProvider;
