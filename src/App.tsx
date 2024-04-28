import SchemaForm from "./components/SchemaForm/SchemaForm";
import { ISchemaFormProps } from "./components/SchemaForm/interface";

const App = (props?: ISchemaFormProps) => {
  return props && <SchemaForm {...props} />;
};

export default App;
