import SchemaForm from "./components/SchemaForm/SchemaForm";
import { ISchemaFormProps } from "./interfaces/SchemaForm.interface";

const App = (props?: ISchemaFormProps) => {
  return (
    props &&
    props.schema &&
    props.formName &&
    props.onSubmit && <SchemaForm {...props} />
  );
};

export default App;
