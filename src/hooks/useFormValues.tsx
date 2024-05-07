import { FieldValues, useFormContext, useWatch } from "react-hook-form";

export const useFormValues = <TFieldValues extends FieldValues>() => {
  const { getValues } = useFormContext<TFieldValues>();
  return {
    ...useWatch<TFieldValues>(),
    ...getValues(),
  };
};
