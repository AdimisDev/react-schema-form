import { ISchemaFormProps } from "../interface";
import { ThemeProvider } from "../context/ThemeProvider";
import { SchemaFormBody } from "./SchemaFormBody";
import "../../../index.css";

export function SchemaForm(props: ISchemaFormProps) {
  return (
    <ThemeProvider
      defaultTheme={props.theme}
      storageKey="adimis-react-schema-form-theme"
      themeColors={props.themeColors}
    >
      <SchemaFormBody {...props} />
    </ThemeProvider>
  );
}
