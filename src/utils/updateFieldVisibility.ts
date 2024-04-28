import { IFieldSchema } from "@/components/SchemaForm/SchemaForm.interface";
import React from "react";

export const updateFieldVisibility = (
  schema: IFieldSchema[],
  watchFields: Record<string, any>,
  setVisibleFields: (value: React.SetStateAction<Set<string>>) => void
) => {
  const newVisibleFields: Set<string> = new Set();

  schema.forEach((formItem) => {
    if (!formItem.displayConditions) {
      newVisibleFields.add(formItem.key);
    } else {
      const isVisible = formItem.displayConditions.every((condition) => {
        const fieldValue = watchFields[condition.dependentField];
        switch (condition.operator) {
          case "===":
            return fieldValue === condition.dependentFieldValue;
          case "!==":
            return fieldValue !== condition.dependentFieldValue;
          case "<":
            return fieldValue < condition.dependentFieldValue;
          case "<=":
            return fieldValue <= condition.dependentFieldValue;
          case ">":
            return fieldValue > condition.dependentFieldValue;
          case ">=":
            return fieldValue >= condition.dependentFieldValue;
          default:
            return false;
        }
      });
      if (isVisible) {
        newVisibleFields.add(formItem.key);
      }
    }
  });

  setVisibleFields(newVisibleFields);
};
