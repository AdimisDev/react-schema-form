import { IFieldSchema } from "../interface";
import { checkRemoveValidationCondition } from "./checkRemoveValidationCondition";

export function onErrorRemoveValidationCheck(
  errors: Record<string, any>,
  schema: IFieldSchema[],
  formResponse: Record<string, any>,
  setCanRemoveValidationFor: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >
): boolean {
  try {
    const allRemoveValidationChecks: boolean[] = Object.keys(errors).map(
      (key) => {
        const errorFieldRemoveValidationConditions:
          | {
              dependentField: string;
              operator: "===" | "!==" | "<" | "<=" | ">" | ">=";
              dependentFieldValue: any;
              relation?: "and";
            }[]
          | undefined = schema.find(
          (field) => field.key === key
        )?.removeValidationConditions;

        const fieldValidationRemoveApproved = checkRemoveValidationCondition(
          errorFieldRemoveValidationConditions,
          formResponse
        );

        if (fieldValidationRemoveApproved) {
          setCanRemoveValidationFor((prev) => {
            return {
              ...prev,
              [key]: true,
            };
          });
        } else {
          setCanRemoveValidationFor((prev) => {
            return {
              ...prev,
              [key]: false,
            };
          });
        }
        return fieldValidationRemoveApproved;
      }
    );

    const isEveryCheckValid = allRemoveValidationChecks.every((valid) => valid);

    return isEveryCheckValid;
  } catch (error) {
    throw new Error("onErrorRemoveValidationCheck:\n" + JSON.stringify(error));
  }
}

export function onChangeRemoveValidationCheck(
  schema: IFieldSchema[],
  formResponse: Record<string, any>,
  setCanRemoveValidationFor: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >
) {
  const isEveryCheckValid = Object.keys(formResponse).map((key) => {
    const errorFieldRemoveValidationConditions:
      | {
          dependentField: string;
          operator: "===" | "!==" | "<" | "<=" | ">" | ">=";
          dependentFieldValue: any;
          relation?: "and";
        }[]
      | undefined = schema.find(
      (field) => field.key === key
    )?.removeValidationConditions;

    const fieldValidationRemoveApproved = checkRemoveValidationCondition(
      errorFieldRemoveValidationConditions,
      formResponse
    );

    if (fieldValidationRemoveApproved) {
      setCanRemoveValidationFor((prev) => {
        return {
          ...prev,
          [key]: true,
        };
      });
    } else {
      setCanRemoveValidationFor((prev) => {
        return {
          ...prev,
          [key]: false,
        };
      });
    }
    return fieldValidationRemoveApproved;
  });
  return isEveryCheckValid;
}
