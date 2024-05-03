import React from "react";
import { IFieldSchema } from "../interface";

export const updateFieldVisibility = (
  schema: IFieldSchema[],
  watchFields: Record<string, any>,
  setVisibleFields: (value: React.SetStateAction<Set<string>>) => void
) => {
  console.log("updateFieldVisibility schema: ", schema);
  console.log("updateFieldVisibility form values: ", watchFields);

  const newVisibleFields: Set<string> = new Set();
  console.log("updateFieldVisibility newVisibleFields: ", newVisibleFields);

  schema.forEach((formItem) => {
    if (!formItem.displayConditions) {
      newVisibleFields.add(formItem.key);
      console.log("updateFieldVisibility newVisibleFields: ", newVisibleFields);
    } else {
      const isVisible = formItem.displayConditions.every((condition) => {
        const fieldValue = watchFields[condition.dependentField];
        console.log(
          "updateFieldVisibility fieldValue: ",
          fieldValue
        );
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
        console.log(
          "updateFieldVisibility isVisible newVisibleFields: ",
          newVisibleFields
        );
      }
    }
  });

  setVisibleFields(newVisibleFields);
};
