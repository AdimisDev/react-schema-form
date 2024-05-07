import { IFieldSchema, ZodSchemaObject } from "@/form.interface";
import { FieldValues } from "react-hook-form";
import { z, ZodSchema } from "zod";

export const generateDynamicSchema = <TFieldValues extends FieldValues>(
  fields: IFieldSchema<TFieldValues>[]
): ZodSchema<ZodSchemaObject<TFieldValues>> => {
  const schemaObject: Partial<ZodSchemaObject<TFieldValues>> = {};

  fields.forEach((field) => {
    if (field.validations) {
      const key = field.key as keyof TFieldValues;
      schemaObject[key] = field.validations;
    }
  });

  return z.object(schemaObject as ZodSchemaObject<TFieldValues>);
};
