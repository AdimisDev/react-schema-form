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
