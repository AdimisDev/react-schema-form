import { useEffect, useId, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  useForm,
  UseFieldArrayProps,
  useWatch,
  Control,
  useFieldArray,
  DeepPartialSkipArrayKey,
} from "react-hook-form";
import { ISchemaFormProps } from "@/form.interface";
import {
  onChangeRemoveValidationCheck,
  onErrorRemoveValidationCheck,
} from "@/lib/utils/removeValidationCheck";
import { updateFieldVisibility } from "@/lib/utils/updateFieldVisibility";
import { generateDynamicSchema } from "@/lib/utils/generateDynamicSchema";
import { getInitialValues } from "@/lib/utils/getInitialValues";
import { handleStorage } from "@/lib/utils/handleStorage";
import { useFormValues } from "./useFormValues";
import { useFieldValues } from "./useFieldValues";
import useEnterKeySubmit from "./useEnterKeySubmit";

export const useSchemaForm = <TFieldValues extends FieldValues>(
  props: ISchemaFormProps<TFieldValues>
) => {
  const formKey = `adimis-schema-form-${props.formName}-${useId()}`;
  const zodSchema = useMemo(() => {
    return generateDynamicSchema(props.schema);
  }, [props.schema]);
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [canRemoveValidationForFields, setCanRemoveValidationForFields] =
    useState<Record<string, boolean>>({});
  const [visibleFields, setVisibleFields] = useState<Set<Path<TFieldValues>>>(
    new Set(props.schema?.map((item) => item.key) || [])
  );

  const formMethods = useForm<TFieldValues>({
    resolver: zodResolver(zodSchema),
    mode: props.validationMode ? props.validationMode : "onChange",
    reValidateMode: props.reValidateMode ? props.reValidateMode : "onSubmit",
    defaultValues: getInitialValues<TFieldValues>(
      formKey,
      props.schema,
      props.persistFormResponse,
      props.defaultValues
    ),
    criteriaMode: props.criteriaMode ? props.criteriaMode : "all",
  });

  const handleOnSubmit = async (values: TFieldValues) => {
    setSubmitButtonLoading(true);

    try {
      if (props.onSubmit) {
        const result = props.onSubmit(values);
        if (result instanceof Promise) {
          await result;
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setSubmitButtonLoading(false);
    }
  };

  const handleOnInvalidSubmit = async (errors: FieldErrors<TFieldValues>) => {
    setSubmitButtonLoading(true);
    const formResponse = formMethods.getValues();
    const isValidForSubmission = onErrorRemoveValidationCheck<TFieldValues>(
      errors,
      props.schema,
      formResponse,
      setCanRemoveValidationForFields
    );
    try {
      if (isValidForSubmission && props.onSubmit) {
        const result = props.onSubmit(formResponse);
        if (result instanceof Promise) {
          await result;
        }
      } else if (props.onInvalidSubmit) {
        const result = props.onInvalidSubmit(errors);
        if (result instanceof Promise) {
          await result;
        }
      }
    } catch (error) {
      console.error("Error during form submission process:", error);
    } finally {
      setSubmitButtonLoading(false);
    }
  };

  const useFieldArrayGetter = (props: UseFieldArrayProps) => {
    return useFieldArray(props);
  };

  const useFormValuesGetter = () => {
    return useFormValues() as TFieldValues;
  };

  const useFieldValuesGetter = <TFieldValues extends FieldValues>(props: {
    name: Path<TFieldValues>;
    control?: Control<TFieldValues>;
    defaultValue?: TFieldValues[Path<TFieldValues>];
    disabled?: boolean;
  }) => {
    return useFieldValues(props);
  };

  const formValues = useWatch<TFieldValues>({
    control: formMethods.control,
  });

  useEffect(() => {
    if (props.onChange) {
      props.onChange(
        formValues,
        formMethods.formState.errors,
        canRemoveValidationForFields
      );
    }
  }, [
    formValues,
    formMethods.formState.errors,
    props,
    canRemoveValidationForFields,
  ]);

  useEffect(() => {
    onChangeRemoveValidationCheck<TFieldValues>(
      props.schema,
      formValues,
      setCanRemoveValidationForFields
    );
    updateFieldVisibility<TFieldValues>(
      props.schema,
      formValues,
      setVisibleFields
    );
  }, [formValues, formMethods.formState.errors, props]);

  useEffect(() => {
    handleStorage<DeepPartialSkipArrayKey<TFieldValues>>(
      formKey,
      formValues,
      props.persistFormResponse
    );
  }, [formValues, formKey, props]);

  useEnterKeySubmit(
    formMethods.handleSubmit(handleOnSubmit, handleOnInvalidSubmit),
    formKey
  );

  return {
    formLabel: props.formLabel,
    formName: props.formName,
    formKey,
    formDescription: props.formDescription,
    formFields: props.schema,
    formMethods,
    visibleFields,
    submitButtonLoading,
    formDisabled: props.formDisabled ? true : false,
    handleOnSubmit,
    handleOnInvalidSubmit,
    useFieldArrayGetter,
    useFormValuesGetter,
    useFieldValuesGetter,
  };
};
