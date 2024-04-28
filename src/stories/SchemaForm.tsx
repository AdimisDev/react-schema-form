import SchemaForm from "@/components/SchemaForm/SchemaForm";
import { ISchemaForm } from "@/interfaces/SchemaForm.interface";

const SchemaFormStory = (props: ISchemaForm) => {
  return <SchemaForm {...props} />;
};

export default SchemaFormStory;
