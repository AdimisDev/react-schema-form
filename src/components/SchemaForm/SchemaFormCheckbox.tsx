import { Control } from "react-hook-form";
import { IFieldSchema } from "./SchemaForm.interface";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Checkbox } from "../ui/checkbox";

function SchemaFormCheckbox({
  formItem,
  control,
}: {
  formItem: IFieldSchema;
  control: Control<Record<string, any>, any>;
}) {
  return (
    <FormField
      key={`${formItem.key}_form_field_${formItem.title}`}
      name={formItem.key as string}
      control={control}
      render={({ field }) => (
        <FormItem className="mt-2">
          <FormControl>
            <div className="items-top flex space-x-2">
              <Checkbox
                id={formItem.key + "checkbox"}
                {...field}
                defaultChecked={formItem.defaultValue === false ? false : true}
                onClick={() => {
                  console.log("Checkbox onchange: ", !field.value)
                  field.onChange(!field.value);
                }}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={formItem.key + "checkbox"}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {formItem.title}
                </label>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default SchemaFormCheckbox;
