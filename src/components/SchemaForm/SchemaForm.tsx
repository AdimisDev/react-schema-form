import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Form, FormField } from "@/components/ui/form";
import { useRef, useState, useEffect } from "react";
import { generateDynamicSchema } from "./generateDynamicSchema";
import renderField from "./renderField";
import { ISchemaForm } from "./SchemaForm.interface";
import { Card, CardContent, CardHeader } from "../ui/card";
import SchemaFormFooter from "./SchemaFormFooter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { z } from "zod";

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
}: ISchemaForm) {
  const formRef = useRef(null);
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
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
  console.log("Zod Schema: ", zodSchema);
  console.log("Initial Form Response: ", initialFormValues)
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: initialFormValues,
  });

  function handleSubmit(values: z.infer<typeof zodSchema>) {
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

  const Container = panel ? Card : "div";
  const ContainerContent = panel ? CardContent : "div";
  const ContainerHeader = panel ? CardHeader : "div";

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

  const watchFields = form.watch();
  const formErrors = form.formState.errors;
  useEffect(() => {
    if (onChange) {
      onChange(watchFields, formErrors);
    }
    if (persistFormResponse === "localStorage") {
      localStorage.setItem(formKey, JSON.stringify(watchFields));
    } else if (persistFormResponse === "sessionStorage") {
      sessionStorage.setItem(formKey, JSON.stringify(watchFields));
    }
  }, [formErrors, watchFields, onChange, persistFormResponse, formKey]);

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
              onSubmit={form.handleSubmit(handleSubmit)}
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
                            if (!fieldName) return null;
                            const formItem = schema.find(
                              (item) => item.key === fieldName
                            );
                            if (!formItem) return null;

                            return (
                              <FormField
                                key={formItem.key}
                                name={formItem.key as string}
                                control={form.control}
                                render={({ field }) =>
                                  renderField(
                                    formItem,
                                    field,
                                    showValidationErrors
                                  )
                                }
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
