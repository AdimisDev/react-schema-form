import { IFieldSchema } from "@/components/SchemaForm/interface";
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

export function checkRemoveValidationCondition(
  data?: {
    dependentField: string;
    operator: "===" | "!==" | "<" | "<=" | ">" | ">=";
    dependentFieldValue: any;
    relation?: "and" | undefined;
  }[],
  formResponse?: Record<string, any>
): boolean {
  if (!data || !formResponse) {
    return false;
  }

  const canRemoveError = data.every((condition) => {
    const { dependentField, operator, dependentFieldValue } = condition;
    const actualValue = formResponse[dependentField];

    switch (operator) {
      case "===":
        return actualValue === dependentFieldValue;
      case "!==":
        return actualValue !== dependentFieldValue;
      case "<":
        return actualValue < dependentFieldValue;
      case "<=":
        return actualValue <= dependentFieldValue;
      case ">":
        return actualValue > dependentFieldValue;
      case ">=":
        return actualValue >= dependentFieldValue;
      default:
        return false;
    }
  });

  return canRemoveError;
}