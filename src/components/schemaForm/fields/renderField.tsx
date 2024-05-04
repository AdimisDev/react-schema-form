import { IFieldSchema } from "../interface";
import { CustomField } from "./CustomField";
import {
  TextField,
  DateField,
  RadioGroupField,
  SelectField,
  TextAreaField,
} from "./Fields";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import "../../../index.css";

const renderField = (
  formItem: IFieldSchema,
  field: ControllerRenderProps<FieldValues, string>,
  loading?: boolean
) => {
  switch (formItem.type) {
    case "email":
    case "password":
    case "text":
      return <TextField field={field} formItem={formItem} loading={loading} />;
    case "select":
      return (
        <SelectField field={field} formItem={formItem} loading={loading} />
      );
    case "textarea":
      return (
        <TextAreaField field={field} formItem={formItem} loading={loading} />
      );
    case "radio group":
      return (
        <RadioGroupField field={field} formItem={formItem} loading={loading} />
      );
    case "date":
      return <DateField field={field} />;
    default:
      return (
        <CustomField
          field={field}
          formItem={formItem}
          key={formItem.key}
          loading={loading}
        />
      );
  }
};

export default renderField;
