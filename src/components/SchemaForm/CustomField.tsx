import { Input } from "@/components/ui/input";
import { CustomFieldProps } from "./interface";

const CustomField = (props: CustomFieldProps) => {
  const { field, loading, formItem } = props;
  return formItem.render ? (
    formItem.render(formItem, field, loading)
  ) : (
    <Input
      type={formItem.type}
      autoComplete={formItem.autoComplete}
      disabled={formItem.disabled || loading}
      placeholder={formItem.placeholder}
      {...field}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        field.onChange(e.target.value)
      }
    />
  );
};

export default CustomField;
