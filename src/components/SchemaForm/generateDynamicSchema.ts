import { z } from "zod";
import { IFieldSchema } from "./SchemaForm.interface";

export const generateDynamicSchema = (
  fields: IFieldSchema[],
  checkboxes?: {
    className?: string | undefined;
    items: IFieldSchema[];
  }
): z.ZodObject<
  any,
  "strip",
  z.ZodTypeAny,
  Record<string, any>,
  Record<string, any>
> => {
  const allFields = checkboxes ? [...fields, ...checkboxes.items] : fields;

  const schemaObject = Object.fromEntries(
    allFields.map((item) => {
      let baseValidation = z.string();

      item.validations?.forEach((fieldValidation) => {
        switch (fieldValidation.type) {
          case "minLength":
            baseValidation = baseValidation.min(Number(fieldValidation.value), {
              message: fieldValidation.message,
            });
            break;
          case "maxLength":
            baseValidation = baseValidation.max(Number(fieldValidation.value), {
              message: fieldValidation.message,
            });
            break;
          case "required":
            baseValidation = baseValidation.min(1, {
              message: fieldValidation.message,
            });
            break;
          default:
            break;
        }
      });

      switch (item.type) {
        case "email":
          return [item.key, baseValidation.email()];
        case "password":
        case "textarea":
        case "text":
          return [item.key, baseValidation];
        case "select":
        case "radio group":
        case "time":
          return [item.key, baseValidation];
        case "multi-select":
          return [item.key, z.array(baseValidation)];
        case "boolean":
          return [item.key, z.boolean()];
        case "range":
          return [item.key, z.number()];
        case "date":
          return [item.key, z.date()];
        case "file":
          return [item.key, z.string()];
        default:
          return [item.key, z.unknown()];
      }
    })
  );

  return z.object(schemaObject);
};
