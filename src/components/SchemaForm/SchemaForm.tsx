import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DevTool } from "@hookform/devtools";
import { Form, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { generateDynamicSchema } from "./generateDynamicSchema";
import renderField from "./renderField";
import {
  IFieldSchema,
  ISchemaForm,
  SchemaFormFooterProps,
} from "./SchemaForm.interface";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";

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
                onChange={() => {
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

function SchemaFormButtons({
  submitButton,
  submitButtonLoading,
  formResponse,
  renderButtons,
  form,
  onSubmit,
  setSubmitButtonLoading,
}: SchemaFormFooterProps) {
  const buttons: React.ReactNode[] = renderButtons
    ? renderButtons(formResponse, form.handleSubmit)
    : [];

  if (!submitButton?.hideSubmit) {
    buttons.unshift(
      <Button
        key="submit"
        className={cn("w-full col-span-4", submitButton?.submitButtonClassName)}
        type="submit"
        variant={submitButton?.submitButtonVarient || "default"}
        loading={submitButtonLoading}
        onClick={() => {
          setSubmitButtonLoading(true);
          form
            .handleSubmit(onSubmit)()
            .then(() => setSubmitButtonLoading(false));
        }}
      >
        {submitButton?.submitButtonName || "Submit"}
      </Button>
    );
  }

  return (
    <>
      {buttons.map((button, index) => {
        if (index === 0) {
          return (
            <div key={index} className="col-span-4">
              {button}
            </div>
          );
        } else if (index === buttons.length - 1) {
          const lastColSpan =
            buttons.length % 2 === 0 ? "col-span-4" : "col-span-2";
          return (
            <div key={index} className={lastColSpan}>
              {button}
            </div>
          );
        } else {
          return (
            <div key={index} className="col-span-2">
              {button}
            </div>
          );
        }
      })}
    </>
  );
}

export default function SchemaForm({
  schema,
  onSubmit,
  onChange,
  devTools,
  centered,
  className,
  submitButton,
  persistFormResponse,
  formName,
  width,
  renderButtons,
  checkboxes,
  links,
  header,
  renderFooter,
  showValidationErrors = true,
  onValidationError,
  // fluid,
  // panel,
  // multiStepFormSteps,
}: ISchemaForm) {
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  const formKey = formName + "_schema_form";
  const initialFormValues: Record<string, any> = schema
    .concat(checkboxes?.items || [])
    .reduce(
      (acc, item) => ({
        ...acc,
        [item.key as string]: item.defaultValue,
      }),
      {}
    );

  const [formResponse, setFormResponse] = useState(initialFormValues);
  const formLocalStorageResponse = localStorage.getItem(formKey);
  const formSessionStorageResponse = sessionStorage.getItem(formKey);

  const formRef = useRef(null);

  let defaultValues: Record<string, any> = {};

  if (persistFormResponse === "localStorage" && formLocalStorageResponse) {
    defaultValues = JSON.parse(formLocalStorageResponse) ?? initialFormValues;
  } else if (
    persistFormResponse === "sessionStorage" &&
    formSessionStorageResponse
  ) {
    defaultValues = JSON.parse(formSessionStorageResponse) ?? initialFormValues;
  } else {
    defaultValues = formResponse;
  }

  const form = useForm({
    resolver: zodResolver(generateDynamicSchema(schema)),
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: defaultValues,
  });

  const watchFields = form.watch();

  useEffect(() => {
    if (persistFormResponse === "localStorage") {
      localStorage.setItem(formKey, JSON.stringify(watchFields));
      setFormResponse(watchFields);
    } else if (persistFormResponse === "sessionStorage") {
      sessionStorage.setItem(formKey, JSON.stringify(watchFields));
      setFormResponse(watchFields);
    } else {
      setFormResponse(watchFields);
    }
    return () => {
      localStorage.removeItem(JSON.stringify(schema) + "_schema_form");
      sessionStorage.removeItem(JSON.stringify(schema) + "_schema_form");
    };
  }, [watchFields, schema, persistFormResponse, formKey]);

  useEffect(() => {
    if (onChange) {
      onChange(watchFields, form.formState.errors);
    }
  }, [watchFields, form.formState.errors, onChange]);

  useEffect(() => {
    if (onValidationError) {
      const errors = form.formState.errors;
      console.log("Errors: ", errors);
      if (Object.keys(errors).length > 0) {
        onValidationError(errors);
      }
    }
  }, [form.formState.errors, onValidationError]);

  return schema ? (
    <div
      className={`w-full h-full ${
        centered && "flex justify-center items-center"
      }`}
      style={{
        maxWidth: width,
        width: "100%",
      }}
    >
      {devTools && <DevTool control={form.control} />}
      <div>{header}</div>
      <Form {...form}>
        <div ref={formRef} className={cn("gap-3 flex flex-col", className)}>
          {schema.map((formItem) => (
            <FormField
              key={formItem.key}
              name={formItem.key as string}
              control={form.control}
              render={({ field }) =>
                renderField(formItem, field, showValidationErrors)
              }
            />
          ))}
          {renderFooter ? (
            <React.Fragment>{renderFooter(formResponse)}</React.Fragment>
          ) : (
            <div>
              <div>{links}</div>

              <div className="grid grid-rows-2 gap-2 mt-5">
                <SchemaFormButtons
                  formResponse={formResponse}
                  key={formKey}
                  renderButtons={renderButtons}
                  submitButton={submitButton}
                  submitButtonLoading={submitButtonLoading}
                  form={form}
                  onSubmit={onSubmit}
                  setSubmitButtonLoading={setSubmitButtonLoading}
                />
              </div>
              <div
                className={`${checkboxes?.className ? checkboxes.className : "flex justify-between items-center mt-5"}`}
              >
                {checkboxes?.items &&
                  checkboxes.items.length > 0 &&
                  checkboxes.items.map((formItem) => (
                    <div key={formItem.key}>
                      <SchemaFormCheckbox
                        control={form.control}
                        formItem={formItem}
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </Form>
    </div>
  ) : (
    <>Schema not found!</>
  );
}
