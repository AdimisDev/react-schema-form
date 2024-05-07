import { Control, FieldValues, Path, useWatch } from "react-hook-form";

export const useFieldValues = <TFieldValues extends FieldValues>(props: {
  name: Path<TFieldValues>;
  control?: Control<TFieldValues>;
  defaultValue?: TFieldValues[Path<TFieldValues>];
  disabled?: boolean;
}) => {
  return useWatch(props);
};
