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
  try {
    const savedValues =
      persistFormResponse === "localStorage"
        ? localStorage.getItem(formKey)
        : sessionStorage.getItem(formKey);
    const initialData = schema
      .concat(checkboxes?.items || [])
      .reduce((acc, item) => ({ ...acc, [item.key]: item.defaultValue }), {});
    return savedValues
      ? { ...initialData, ...JSON.parse(savedValues) }
      : initialData;
  } catch (error) {
    throw new Error("getInitialValues:\n" + JSON.stringify(error));
  }
};
