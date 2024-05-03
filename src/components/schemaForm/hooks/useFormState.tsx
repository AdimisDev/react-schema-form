import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useState, useEffect, useMemo, useCallback } from "react";
import { generateDynamicSchema } from "../utils/generateDynamicSchema";
import { IFieldSchema } from "../interface";
import { z } from "zod";
import { getInitialValues } from "../utils/getInitialValues";
import { onChangeRemoveValidationCheck } from "../utils/removeValidationCheck";
import { updateFieldVisibility } from "../utils/updateFieldVisibility";

export function useFormState(
  formName: string,
  schema: IFieldSchema[],
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
  const formKey = formName + "_schema_form";
  const defaultValues = getInitialValues(
    formKey,
    schema,
    persistFormResponse,
    checkboxes
  );

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
    const formValues = formMethods.getValues();
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
  }, [onChange, formMethods, canRemoveValidationFor, schema]);

  useEffect(() => {
    const subscription = formMethods.watch((_, { type }) => {
      if (type !== "focus") {
        handleOnChange();
      }
    });
    return () => subscription.unsubscribe();
  }, [handleOnChange, formMethods]);

  return {
    formKey,
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
