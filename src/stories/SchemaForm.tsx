import SchemaForm from "@/components/SchemaForm/SchemaForm";
import { ISchemaForm } from "@/components/SchemaForm/SchemaForm.interface";

const SchemaFormStory = (props: ISchemaForm) => {
  return <SchemaForm {...props} />;
};

export default SchemaFormStory;
