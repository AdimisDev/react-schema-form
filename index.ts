import "./src/index.css";

// Shadcn Styled Form
import ShadcnForm from "./src/components/ShadcnForm";
import MultiStepShadcnForm from "@/components/MultiStepShadcnForm";
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
  MultiStepShadcnForm,
  SchemaFormProvider,
  useSchemaFormContext,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
};
