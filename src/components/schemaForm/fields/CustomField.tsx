import { CustomFieldProps } from "@/components/schemaForm/interface";
import { Input } from "@/components/ui/input";
import "../../../index.css";

export function CustomField(props: CustomFieldProps) {
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
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (e) {
          field.onChange(e.target.value);
        }
      }}
    />
  );
}
