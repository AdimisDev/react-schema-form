import { z } from "zod";
import { IFieldSchema } from "./SchemaForm.interface";

export const generateDynamicSchema = (
  fields: IFieldSchema[]
): z.ZodObject<
  any,
  "strip",
  z.ZodTypeAny,
  Record<string, any>,
  Record<string, any>
> => {
  const schemaObject = Object.fromEntries(
    fields.map((item) => {
      switch (item.type) {
        case "string": {
          let stringValidation = z.string();
          item.validations?.forEach((fieldValidation) => {
            if (fieldValidation.type === "minLength") {
              stringValidation = stringValidation.min(
                Number(fieldValidation.value),
                {
                  message: fieldValidation.message,
                }
              );
            }
            if (fieldValidation.type === "maxLength") {
              stringValidation = stringValidation.max(
                Number(fieldValidation.value),
                {
                  message: fieldValidation.message,
                }
              );
            }
            if (fieldValidation.type === "required") {
              stringValidation = stringValidation.min(1, {
                message: fieldValidation.message,
              });
            }
          });
          return [item.key, stringValidation];
        }
        case "email": {
          let emailValidation = z.string();
          item.validations?.forEach((fieldValidation) => {
            if (fieldValidation.type === "minLength") {
              emailValidation = emailValidation.min(
                Number(fieldValidation.value),
                {
                  message: fieldValidation.message,
                }
              );
            }
            if (fieldValidation.type === "maxLength") {
              emailValidation = emailValidation.max(
                Number(fieldValidation.value),
                {
                  message: fieldValidation.message,
                }
              );
            }
            if (fieldValidation.type === "required") {
              emailValidation = emailValidation.min(1, {
                message: fieldValidation.message,
              });
            }
            if (fieldValidation.type === "optional") {
              return;
            }
          });
          return [item.key, emailValidation];
        }
        case "password": {
          let passwordValidation = z.string();
          item.validations?.forEach((fieldValidation) => {
            if (fieldValidation.type === "required") {
              passwordValidation = passwordValidation.min(1, {
                message: fieldValidation.message,
              });
            }
            if (fieldValidation.type === "minLength") {
              passwordValidation = passwordValidation.min(
                Number(fieldValidation.value),
                {
                  message: fieldValidation.message,
                }
              );
            }
            if (fieldValidation.type === "maxLength") {
              passwordValidation = passwordValidation.max(
                Number(fieldValidation.value),
                {
                  message: fieldValidation.message,
                }
              );
            }
            if (fieldValidation.type === "optional") {
              return;
            }
          });
          return [item.key, passwordValidation];
        }
        case "textarea": {
          let textareaValidation = z.string();
          item.validations?.forEach((fieldValidation) => {
            if (fieldValidation.type === "minLength") {
              textareaValidation = textareaValidation.min(
                Number(fieldValidation.value),
                {
                  message: fieldValidation.message,
                }
              );
            }
            if (fieldValidation.type === "maxLength") {
              textareaValidation = textareaValidation.max(
                Number(fieldValidation.value),
                {
                  message: fieldValidation.message,
                }
              );
            }
            if (fieldValidation.type === "required") {
              textareaValidation = textareaValidation.min(1, {
                message: fieldValidation.message,
              });
            }
            if (fieldValidation.type === "optional") {
              return;
            }
          });
          return [item.key, textareaValidation];
        }
        case "select": {
          let selectValidation = z.string();
          item.validations?.forEach((fieldValidation) => {
            if (fieldValidation.type === "required") {
              selectValidation = selectValidation.min(1, {
                message: fieldValidation.message,
              });
            }
            if (fieldValidation.type === "optional") {
              return;
            }
          });
          return [item.key, selectValidation];
        }
        case "multi-select": {
          let multiSelectValidation = z.array(z.string());
          item.validations?.forEach((fieldValidation) => {
            if (fieldValidation.type === "required") {
              multiSelectValidation = multiSelectValidation.min(1, {
                message: fieldValidation.message,
              });
            }
            if (fieldValidation.type === "optional") {
              return;
            }
          });
          return [item.key, multiSelectValidation];
        }
        case "radio group":
          return [item.key, z.string()];
        case "file":
          return [item.key, z.string()];
        case "boolean":
          return [item.key, z.boolean()];
        case "range":
          return [item.key, z.number()];
        case "date":
          return [item.key, z.date()];
        case "time":
          return [item.key, z.string()];
        default:
          throw new Error(`Unsupported type: ${item.type}`);
      }
    })
  );
  return z.object(schemaObject);
};
