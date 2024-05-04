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
  const functionName = 'getInitialValues'; // Define the function name as a constant
  let savedValues: Record<string, any> = {};
  if (typeof window !== 'undefined') {
    const storage = persistFormResponse === "localStorage" ? window.localStorage : window.sessionStorage;
    if (storage) {
      try {
        const item = storage.getItem(formKey);
        if (item) {
          savedValues = JSON.parse(item);
          console.log(`[${functionName}] Retrieved saved values: `, savedValues);
        } else {
          console.log(`[${functionName}] No saved values found for key: ${formKey}`);
        }
      } catch (error) {
        console.error(`[${functionName}] Error parsing ${persistFormResponse} data: `, error);
      }
    }
  }

  const initialData = schema
    .concat(checkboxes?.items || [])
    .reduce<Record<string, any>>((acc, item) => {
      acc[item.key] = item.key in savedValues ? savedValues[item.key] : item.defaultValue;
      return acc;
    }, {});

  console.log(`[${functionName}] Initial data after merge: `, initialData);
  return initialData;
};
