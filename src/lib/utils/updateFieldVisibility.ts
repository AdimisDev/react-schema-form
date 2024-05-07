import { IFieldSchema } from "@/form.interface";
import React from "react";
import { DeepPartialSkipArrayKey, FieldValues, Path } from "react-hook-form";

export const updateFieldVisibility = <TFieldValues extends FieldValues>(
  schema: IFieldSchema<TFieldValues>[],
  watchFields: DeepPartialSkipArrayKey<TFieldValues>,
  setVisibleFields: React.Dispatch<
    React.SetStateAction<Set<Path<TFieldValues>>>
  >
) => {
  console.log("updateFieldVisibility schema: ", schema);
  console.log("updateFieldVisibility form values: ", watchFields);

  const newVisibleFields: Set<Path<TFieldValues>> = new Set();
  console.log("updateFieldVisibility newVisibleFields: ", newVisibleFields);

  schema.forEach((formItem) => {
    if (!formItem.displayConditions) {
      newVisibleFields.add(formItem.key);
      console.log("updateFieldVisibility newVisibleFields: ", newVisibleFields);
    } else {
      const isVisible = formItem.displayConditions.every((condition) => {
        const fieldValue = watchFields[condition.dependentField];
        console.log("updateFieldVisibility fieldValue: ", fieldValue);
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
