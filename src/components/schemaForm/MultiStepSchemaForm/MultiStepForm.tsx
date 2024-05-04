import { IMultiStepSchemaFormProps } from "../interface";
import { ThemeProvider } from "../context/ThemeProvider";
import "../../../index.css";
import { MultiStepSchemaFormBody } from "./MultiStepFormBody";

export function MultiStepSchemaForm(props: IMultiStepSchemaFormProps) {
  return (
    <ThemeProvider
      defaultTheme={props.theme}
      storageKey="adimis-react-multi-schema-form-theme"
      themeColors={props.themeColors}
    >
      <MultiStepSchemaFormBody {...props} />
    </ThemeProvider>
  );
}
