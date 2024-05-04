import { IMultiStepSchemaFormProps } from "../interface";
import { ThemeProvider } from "../context/ThemeProvider";
import "../../../index.css";

export function MultiStepSchemaForm(props: IMultiStepSchemaFormProps) {
  return (
    <ThemeProvider
      defaultTheme={props.theme}
      storageKey="adimis-react-schema-form-theme"
      themeColors={props.themeColors}
    >
      <MultiStepSchemaForm {...props} />
    </ThemeProvider>
  );
}
