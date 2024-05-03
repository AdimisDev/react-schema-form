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
import { useState } from "react";
import renderField from "../fields/renderField";
import { IMultiStepSchemaFormProps } from "../interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import SchemaFormFooter from "../partials/SchemaFormFooter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useFormState } from "../hooks/useFormState";
import { onErrorRemoveValidationCheck } from "../utils/removeValidationCheck";

export function MultiStepSchemaForm({
  schema,
  onSubmit,
  onChange,
  devTools,
  submitButton,
  persistFormResponse,
  formName,
  description,
  width,
  renderButtons,
  checkboxes,
  links,
  renderHeader,
  renderFooter,
  multiStepFormSteps,
  showValidationErrors = true,
  panel = true,
  validationMode,
  reValidateMode,
  formClassName,
}: IMultiStepSchemaFormProps) {
  const Container = panel ? Card : "div";
  const ContainerContent = panel ? CardContent : "div";
  const ContainerHeader = panel ? CardHeader : "div";
  const [currentStep, setCurrentStep] = useState(
    Object.keys(multiStepFormSteps ? multiStepFormSteps : {})[0]
  );

  const {
    formKey,
    formMethods,
    visibleFields,
    submitButtonLoading,
    canRemoveValidationFor,
    setSubmitButtonLoading,
    setCanRemoveValidationFor,
  } = useFormState(
    formName,
    schema,
    persistFormResponse,
    checkboxes,
    onChange,
    validationMode,
    reValidateMode
  );

  function handleSubmit(values: Record<string, any>) {
    try {
      if (onSubmit) {
        setSubmitButtonLoading(true);
        const result = onSubmit({ success: values });
        if (result instanceof Promise) {
          result.then(() => setSubmitButtonLoading(false));
        } else {
          setSubmitButtonLoading(false);
        }
      }
    } catch (error) {
      setSubmitButtonLoading(false);
      throw new Error("handleSubmit:\n" + JSON.stringify(error));
    }
  }

  function handleInvalidSubmit(errors: Record<string, any>) {
    try {
      if (onSubmit) {
        const formResponse = formMethods.getValues();
        const isEveryCheckValid = onErrorRemoveValidationCheck(
          errors,
          schema,
          formResponse,
          setCanRemoveValidationFor
        );
        setSubmitButtonLoading(true);
        const result = onSubmit(
          isEveryCheckValid ? { success: formResponse } : { errors: errors }
        );
        if (result instanceof Promise) {
          result.then(() => setSubmitButtonLoading(false));
        } else {
          setSubmitButtonLoading(false);
        }
      }
    } catch (error) {
      setSubmitButtonLoading(false);
      throw new Error("handleInvalidSubmit:\n" + JSON.stringify(error));
    }
  }

  // Multi Step Form Variables and Methods
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

  return (
    schema && (
      <Container className={`w-full h-full max-w-[${width}]`}>
        <ContainerHeader>
          {devTools && <DevTool control={formMethods.control} />}
          {renderHeader ? (
            renderHeader(CardTitle, CardDescription)
          ) : (
            <>
              <CardTitle>{formName}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </>
          )}
        </ContainerHeader>
        <ContainerContent>
          <Form {...formMethods}>
            <form
              className={`gap-4 ${formClassName}`}
              onSubmit={formMethods.handleSubmit(
                handleSubmit,
                handleInvalidSubmit
              )}
            >
              {multiStepFormSteps && (
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
                                control={formMethods.control}
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
                            formResponse={formMethods.getValues()}
                            key={formKey}
                            renderButtons={renderButtons}
                            submitButton={submitButton}
                            submitButtonLoading={submitButtonLoading}
                            form={formMethods}
                            formKey={formKey}
                            links={links}
                            renderFooter={renderFooter}
                            checkboxes={checkboxes}
                            canRemoveValidationFor={canRemoveValidationFor}
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
              )}
            </form>
          </Form>
        </ContainerContent>
      </Container>
    )
  );
}
