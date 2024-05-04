import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useState, useEffect, useMemo, useCallback } from "react";
import { generateDynamicSchema } from "../utils/generateDynamicSchema";
import { IFieldSchema } from "../interface";
import { z } from "zod";
import { onChangeRemoveValidationCheck } from "../utils/removeValidationCheck";
import { updateFieldVisibility } from "../utils/updateFieldVisibility";

function handleStorage(
  key: string,
  persistFormResponse: "localStorage" | "sessionStorage",
  value: Record<string, any>
) {
  if (
    typeof window !== "undefined" &&
    window.localStorage &&
    window.sessionStorage
  ) {
    switch (persistFormResponse) {
      case "localStorage":
        return localStorage.setItem(key, JSON.stringify(value));
      case "sessionStorage":
        return sessionStorage.setItem(key, JSON.stringify(value));
    }
  }
}

export function useFormState(
  formKey: string,
  schema: IFieldSchema[],
  defaultValues: Record<string, any>,
  persistFormResponse: "localStorage" | "sessionStorage" | undefined,
  checkboxes:
    | {
        className?: string | undefined;
        items: IFieldSchema[];
      }
    | undefined,
  onChange?: (
    formResponse: Record<string, any>,
    formErrors: FieldErrors<Record<string, any>>,
    canRemoveValidationFor: Record<string, boolean>
  ) => void,
  validationMode?:
    | "onBlur"
    | "onChange"
    | "onSubmit"
    | "onTouched"
    | "all"
    | undefined,
  reValidateMode?: "onBlur" | "onChange" | "onSubmit" | undefined
) {
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [canRemoveValidationFor, setCanRemoveValidationFor] = useState<
    Record<string, boolean>
  >({});
  const [visibleFields, setVisibleFields] = useState(
    new Set(schema.map((item) => item.key))
  );

  const zodSchema = useMemo(() => {
    const allFields = checkboxes ? [...schema, ...checkboxes.items] : schema;
    return generateDynamicSchema(allFields);
  }, [checkboxes, schema]);

  const formMethods = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    mode: validationMode ? validationMode : "onChange",
    reValidateMode: reValidateMode ? reValidateMode : "onChange",
    defaultValues: defaultValues,
  });

  const handleOnChange = useCallback(() => {
    const formValues = formMethods.watch();
    if (onChange) {
      const formResponse = formValues;
      onChange(
        formResponse,
        formMethods.formState.errors,
        canRemoveValidationFor
      );
      formMethods.clearErrors();
    }
    onChangeRemoveValidationCheck(
      schema,
      formValues,
      setCanRemoveValidationFor
    );
    updateFieldVisibility(schema, formValues, setVisibleFields);
  }, [
    onChange,
    formMethods,
    canRemoveValidationFor,
    schema,
  ]);

  const handleStorageChange = useCallback(() => {
    const formValues = formMethods.watch();
    if(persistFormResponse){
      handleStorage(formKey, persistFormResponse, formValues);
    }
  }, [
    formKey,
    formMethods,
    persistFormResponse,
  ]);

  useEffect(() => {
    const subscription = formMethods.watch((_, { type }) => {
      if (type !== "focus") {
        handleOnChange();
        handleStorageChange();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [handleOnChange, formMethods, handleStorageChange]);

  return {
    allFields: checkboxes ? [...schema, ...checkboxes.items] : schema,
    formState: formMethods.formState,
    formMethods,
    visibleFields,
    setVisibleFields,
    submitButtonLoading,
    setSubmitButtonLoading,
    canRemoveValidationFor,
    setCanRemoveValidationFor,
  };
}
