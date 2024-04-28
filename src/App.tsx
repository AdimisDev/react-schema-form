import SchemaForm from "./components/SchemaForm/SchemaForm";
import { schemaFormProps } from "./mock/schemaFormProps";

const App = () => {
  return <SchemaForm {...schemaFormProps} />;
};

export default App;
