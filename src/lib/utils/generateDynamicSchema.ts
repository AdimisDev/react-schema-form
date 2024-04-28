import { z } from "zod";
import { IFieldSchema } from "../../interfaces/SchemaForm.interface";

export const generateDynamicSchema = (fields: IFieldSchema[]) => {
  const schemaObject: any = {};

  fields.forEach((field) => {
    if (field.validations) {
      schemaObject[field.key as any] = field.validations;
    }
  });

  return z.object(schemaObject);
};