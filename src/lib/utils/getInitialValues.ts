import { AsyncDefaultValues, IFieldSchema } from "@/form.interface";
import { DefaultValues, FieldValues } from "react-hook-form";

export const getInitialValues = <TFieldValues extends FieldValues>(
  formKey: string,
  schema: IFieldSchema<TFieldValues>[],
  persistFormResponse: "localStorage" | "sessionStorage" | undefined,
  defaultValues?: DefaultValues<TFieldValues> | AsyncDefaultValues<TFieldValues>
): DefaultValues<TFieldValues> | AsyncDefaultValues<TFieldValues> | undefined => {
  let savedValues: Record<string, any> = {};
  if (typeof window !== "undefined") {
    const storage =
      persistFormResponse === "localStorage"
        ? window.localStorage
        : window.sessionStorage;
    if (storage) {
      try {
        const item = storage.getItem(formKey);
        if (item) {
          savedValues = JSON.parse(item);
        }
      } catch (error) {
        console.error("Error parsing storage item:", error);
        return undefined;
      }
    }
  }

  let initialValues = schema.reduce<Record<string, any>>((acc, item) => {
    acc[item.key] = item.defaultValue;
    return acc;
  }, {});

  if (defaultValues) {
    initialValues = { ...initialValues, ...defaultValues };
  }

  initialValues = { ...initialValues, ...savedValues };

  return initialValues as DefaultValues<TFieldValues> | AsyncDefaultValues<TFieldValues> | undefined;
};
