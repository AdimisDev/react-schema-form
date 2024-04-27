import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DevTool } from "@hookform/devtools";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Form, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { generateDynamicSchema } from "./generateDynamicSchema";
import renderField from "./renderField";
import { ISchemaForm } from "./SchemaForm.interface";

export default function SchemaForm({
  schema,
  onSubmit,
  onChange,
  submitButtonName,
  submitButtonClassName,
  submitButtonVarient,
  devTools,
  centered,
  className,
  disableSubmit,
  // loading,
}: ISchemaForm) {
  console.log("schema form config: ", schema);
  const initialFormValues: Record<string, any> = schema.reduce(
    (acc, item) => ({
      ...acc,
      [item.key as string]: item.defaultValue,
    }),
    {}
  );

  console.log("Initial Form Values: ", initialFormValues);

  const [formResponseData, setFormResponseData] = useLocalStorage(
    JSON.stringify(schema) + "_schema_form",
    initialFormValues
  );

  const formRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(generateDynamicSchema(schema)),
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: formResponseData,
  });

  const watchFields = form.watch();

  useEffect(() => {
    setFormResponseData(watchFields);
    return () => {
      localStorage.removeItem(JSON.stringify(schema) + "_schema_form");
    };
  }, [watchFields, setFormResponseData, schema]);

  useEffect(() => {
    if (onChange) {
      onChange(watchFields, form.formState.errors);
    }
  }, [watchFields, form.formState.errors, onChange]);

  return schema ? (
    <div
      className={`__schema_form w-full h-full ${
        centered && "flex justify-center items-center"
      }`}
    >
      {devTools && <DevTool control={form.control} />}
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit(onSubmit)();
          }}
          className={cn("gap-3 flex flex-col", className)}
        >
          {schema.map((formItem) => (
            <FormField
              key={formItem.key}
              name={formItem.key as string}
              control={form.control}
              render={({ field }) => renderField(formItem, field)}
            />
          ))}
          {!disableSubmit && (
            <Button
              className={cn("w-full mt-3", submitButtonClassName)}
              type="submit"
              variant={submitButtonVarient || "default"}
              // loading={loading}
            >
              {submitButtonName || "Submit"}
            </Button>
          )}
        </form>
      </Form>
    </div>
  ) : (
    <>Schema not found!</>
  );
}
