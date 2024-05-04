import { IFieldSchema } from "../interface";

export const getInitialValues = (
  formKey: string,
  schema: IFieldSchema[],
  persistFormResponse: "localStorage" | "sessionStorage" | undefined,
  checkboxes:
    | {
        className?: string | undefined;
        items: IFieldSchema[];
      }
    | undefined
): Record<string, any> => {
  let savedValues: Record<string, any> = {};
  if (typeof window !== 'undefined') {
    const storage = persistFormResponse === "localStorage" ? window.localStorage : window.sessionStorage;
    if (storage) {
      try {
        const item = storage.getItem(formKey);
        if (item) {
          savedValues = JSON.parse(item);
        }
      } catch (error) {
        return {};
      }
    }
  }

  if (!schema) {
    return {};
  }

  const initialData = schema
    .concat(checkboxes?.items || [])
    .reduce<Record<string, any>>((acc, item) => {
      acc[item.key] = item.key in savedValues ? savedValues[item.key] : item.defaultValue;
      return acc;
    }, {});

  return initialData;
};
