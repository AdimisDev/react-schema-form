import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRef, useState, useEffect } from "react";
import { generateDynamicSchema } from "../../lib/utils/generateDynamicSchema";
import renderField from "./renderField";
import { ISchemaFormProps } from "../../interfaces/SchemaForm.interface";
import { Card, CardContent, CardHeader } from "../ui/card";
import SchemaFormFooter from "./SchemaFormFooter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { z } from "zod";
// import { checkAndDisableValidation } from "@/utils/updateFieldVisibility";
import {
  checkRemoveValidationCondition,
  updateFieldVisibility,
} from "@/lib/utils/updateFieldVisibility";

export default function SchemaForm({
  schema,
  onSubmit,
  onChange,
  devTools,
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
  multiStepFormSteps,
  showValidationErrors = true,
  panel = true,
}: ISchemaFormProps) {
  const formRef = useRef(null);
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [canIgnoreErrors, setCanIgnoreErrors] = useState<
    Record<string, boolean>
  >({});
  const formKey = formName + "_schema_form";
  const getInitialValues = () => {
    const savedValues =
      persistFormResponse === "localStorage"
        ? localStorage.getItem(formKey)
        : sessionStorage.getItem(formKey);
    const initialData = schema
      .concat(checkboxes?.items || [])
      .reduce((acc, item) => ({ ...acc, [item.key]: item.defaultValue }), {});
    return savedValues
      ? { ...initialData, ...JSON.parse(savedValues) }
      : initialData;
  };

  const initialFormValues = getInitialValues();

  const [currentStep, setCurrentStep] = useState(
    Object.keys(multiStepFormSteps ? multiStepFormSteps : {})[0]
  );

  const allFields = checkboxes ? [...schema, ...checkboxes.items] : schema;
  const zodSchema = generateDynamicSchema(allFields);
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: initialFormValues,
  });

  const [formResponse, setFormResponse] = useState<Record<string, any>>({});

  const [visibleFields, setVisibleFields] = useState(
    new Set(schema.map((item) => item.key))
  );

  function handleSubmit(values: Record<string, any>) {
    if (onSubmit) {
      setSubmitButtonLoading(true);
      const result = onSubmit(values);
      if (result instanceof Promise) {
        result.then(() => setSubmitButtonLoading(false));
      } else {
        setSubmitButtonLoading(false);
      }
    }
  }

  function handleInvalidSubmit(errors: Record<string, any>) {
    if (onSubmit) {
      const formResponse = form.watch();
      console.error("Invalid Submit: ", errors);

      const allRemoveValidationChecks: boolean[] = Object.keys(errors).map(
        (key) => {
          const errorFieldRemoveValidationConditions:
            | {
                dependentField: string;
                operator: "===" | "!==" | "<" | "<=" | ">" | ">=";
                dependentFieldValue: any;
                relation?: "and";
              }[]
            | undefined = schema.find(
            (field) => field.key === key
          )?.removeValidationConditions;

          const fieldValidationRemoveApproved = checkRemoveValidationCondition(
            errorFieldRemoveValidationConditions,
            formResponse
          );

          if (fieldValidationRemoveApproved) {
            setCanIgnoreErrors((prev) => {
              return {
                ...prev,
                [key]: true,
              };
            });
          } else {
            setCanIgnoreErrors((prev) => {
              return {
                ...prev,
                [key]: false,
              };
            });
          }
          return fieldValidationRemoveApproved;
        }
      );
      console.log("allRemoveValidationChecks: ", allRemoveValidationChecks);

      const isEveryCheckValid = allRemoveValidationChecks.every(
        (valid) => valid
      );
      console.log("isEveryCheckValid: ", isEveryCheckValid, formResponse);

      setSubmitButtonLoading(true);
      const result = onSubmit(isEveryCheckValid ? formResponse : errors);
      if (result instanceof Promise) {
        result.then(() => setSubmitButtonLoading(false));
      } else {
        setSubmitButtonLoading(false);
      }
    }
  }

  // Form Variables
  const watchFields = form.watch();
  const formErrors = form.formState.errors;

  // Layout Variables
  const Container = panel ? Card : "div";
  const ContainerContent = panel ? CardContent : "div";
  const ContainerHeader = panel ? CardHeader : "div";

  // Multi Step Form Variables
  const stepKeys = Object.keys(multiStepFormSteps ? multiStepFormSteps : {});
  const isLastStep = currentStep === stepKeys[stepKeys.length - 1];

  const handleNext = () => {
    const currentIndex = stepKeys.indexOf(currentStep);
    const nextIndex = currentIndex + 1;
    if (nextIndex < stepKeys.length) {
      setCurrentStep(stepKeys[nextIndex]);
    }
  };

  const handlePrev = () => {
    const currentIndex = stepKeys.indexOf(currentStep);
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(stepKeys[prevIndex]);
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(watchFields, formErrors, canIgnoreErrors);
    }
    if (persistFormResponse === "localStorage") {
      localStorage.setItem(formKey, JSON.stringify(watchFields));
    } else if (persistFormResponse === "sessionStorage") {
      sessionStorage.setItem(formKey, JSON.stringify(watchFields));
    }
    if (JSON.stringify(watchFields) !== JSON.stringify(formResponse)) {
      setFormResponse(watchFields);
    }
  }, [
    formErrors,
    watchFields,
    onChange,
    persistFormResponse,
    formKey,
    formResponse,
    canIgnoreErrors,
  ]);

  useEffect(() => {
    Object.keys(formResponse).map((key) => {
      const errorFieldRemoveValidationConditions:
        | {
            dependentField: string;
            operator: "===" | "!==" | "<" | "<=" | ">" | ">=";
            dependentFieldValue: any;
            relation?: "and";
          }[]
        | undefined = schema.find(
        (field) => field.key === key
      )?.removeValidationConditions;

      const fieldValidationRemoveApproved = checkRemoveValidationCondition(
        errorFieldRemoveValidationConditions,
        formResponse
      );

      if (fieldValidationRemoveApproved) {
        setCanIgnoreErrors((prev) => {
          return {
            ...prev,
            [key]: true,
          };
        });
      } else {
        setCanIgnoreErrors((prev) => {
          return {
            ...prev,
            [key]: false,
          };
        });
      }
      return fieldValidationRemoveApproved;
    });
  }, [formResponse, schema]);

  useEffect(() => {
    updateFieldVisibility(schema, formResponse, setVisibleFields);
  }, [schema, formResponse]);

  return (
    schema && (
      <Container className={`w-full h-full max-w-[${width}]`}>
        <ContainerHeader>
          {devTools && <DevTool control={form.control} />}
          {header && (
            <div className={`${panel ? undefined : "mb-6"}`}>{header}</div>
          )}
        </ContainerHeader>
        <ContainerContent>
          <Form {...form}>
            <form
              className={`gap-4 ${className}`}
              ref={formRef}
              onSubmit={form.handleSubmit(handleSubmit, handleInvalidSubmit)}
            >
              {multiStepFormSteps ? (
                <>
                  <Tabs
                    defaultValue={Object.keys(multiStepFormSteps)[0]}
                    value={currentStep}
                    onValueChange={setCurrentStep}
                  >
                    <TabsList>
                      {Object.entries(multiStepFormSteps).map(
                        ([key, value]) => (
                          <TabsTrigger key={key} value={key}>
                            {value.stageLabel}
                          </TabsTrigger>
                        )
                      )}
                    </TabsList>
                    {Object.entries(multiStepFormSteps).map(([key, value]) => (
                      <TabsContent key={key} value={key}>
                        <div className="grid grid-row-* grid-col-* mt-5">
                          {value.fields?.map((fieldName) => {
                            if (!fieldName || !visibleFields.has(fieldName))
                              return null;
                            const formItem = schema.find(
                              (item) => item.key === fieldName
                            );
                            if (!formItem) return null;

                            return (
                              <FormField
                                key={formItem.key}
                                name={formItem.key as string}
                                control={form.control}
                                render={({ field }) => {
                                  return (
                                    <FormItem>
                                      <FormLabel>{formItem.title}</FormLabel>
                                      <FormControl>
                                        {renderField(formItem, field)}
                                      </FormControl>
                                      {formItem.description && (
                                        <FormDescription>
                                          {formItem.description}
                                        </FormDescription>
                                      )}
                                      {showValidationErrors && <FormMessage />}
                                    </FormItem>
                                  );
                                }}
                              />
                            );
                          })}
                        </div>
                        {isLastStep && (
                          <SchemaFormFooter
                            formResponse={form.watch()}
                            key={formKey}
                            renderButtons={renderButtons}
                            submitButton={submitButton}
                            submitButtonLoading={submitButtonLoading}
                            form={form}
                            formKey={formKey}
                            links={links}
                            renderFooter={renderFooter}
                            checkboxes={checkboxes}
                          />
                        )}
                      </TabsContent>
                    ))}
                  </Tabs>
                  <div className="flex justify-between mt-4">
                    <Button
                      disabled={
                        currentStep === Object.keys(multiStepFormSteps)[0]
                      }
                      onClick={handlePrev}
                    >
                      Prev
                    </Button>
                    <Button onClick={handleNext} disabled={isLastStep}>
                      Next
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-row-* grid-col-*">
                    {schema.map(
                      (formItem) =>
                        visibleFields.has(formItem.key) && (
                          <FormField
                            key={formItem.key}
                            name={formItem.key as string}
                            control={form.control}
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel>{formItem.title}</FormLabel>
                                  <FormControl>
                                    {renderField(formItem, field)}
                                  </FormControl>
                                  {formItem.description && (
                                    <FormDescription>
                                      {formItem.description}
                                    </FormDescription>
                                  )}
                                  {showValidationErrors && <FormMessage />}
                                </FormItem>
                              );
                            }}
                          />
                        )
                    )}
                  </div>
                  <SchemaFormFooter
                    formResponse={form.watch()}
                    key={formKey}
                    renderButtons={renderButtons}
                    submitButton={submitButton}
                    submitButtonLoading={submitButtonLoading}
                    form={form}
                    formKey={formKey}
                    links={links}
                    renderFooter={renderFooter}
                    checkboxes={checkboxes}
                  />
                </>
              )}
            </form>
          </Form>
        </ContainerContent>
      </Container>
    )
  );
}
