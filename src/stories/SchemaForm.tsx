import SchemaForm from "@/components/SchemaForm/SchemaForm";
import { ISchemaFormProps } from "@/interfaces/SchemaForm.interface";

const SchemaFormStory = (props: ISchemaFormProps) => {
  return <SchemaForm {...props} />;
};

export default SchemaFormStory;
