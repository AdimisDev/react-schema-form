import { SchemaForm } from "./SchemaForm/SchemaForm";
import { MultiStepSchemaForm } from "./MultiStepSchemaForm/MultiStepForm";
import { useFormState } from "./hooks/useFormState";
import { CustomField } from "./fields/CustomField";
import {
  TextField,
  SelectField,
  TextAreaField,
  RadioGroupField,
  DateField,
} from "@/components/schemaForm/fields/Fields";
import renderField from "./fields/renderField";
import { checkRemoveValidationCondition } from "./utils/checkRemoveValidationCondition";
import { generateDynamicSchema } from "./utils/generateDynamicSchema";
import { getInitialValues } from "./utils/getInitialValues";
import {
  onErrorRemoveValidationCheck,
  onChangeRemoveValidationCheck,
} from "./utils/removeValidationCheck";
import { updateFieldVisibility } from "./utils/updateFieldVisibility";

export {
  SchemaForm,
  MultiStepSchemaForm,
  useFormState,
  CustomField,
  TextField,
  SelectField,
  TextAreaField,
  RadioGroupField,
  DateField,
  renderField,
  checkRemoveValidationCondition,
  generateDynamicSchema,
  getInitialValues,
  onErrorRemoveValidationCheck,
  onChangeRemoveValidationCheck,
  updateFieldVisibility,
};
