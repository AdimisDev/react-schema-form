import "./src/index.css";

// Shadcn Styled Form
import ShadcnForm from "./src/components/ShadcnForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./src/components/ui/select";

// Context To Create Your Own Form
import SchemaFormProvider, {
  useSchemaFormContext,
} from "./src/context/FormContext";

export * from "./src/form.interface";
export {
  ShadcnForm,
  SchemaFormProvider,
  useSchemaFormContext,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
};
