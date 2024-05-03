import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
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
import { useState, useEffect, useMemo, useCallback } from "react";
import { generateDynamicSchema } from "../../../lib/utils/generateDynamicSchema";
import renderField from "../fields/renderField";
import { IFieldSchema, IMultiStepSchemaFormProps } from "../interface";
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
import { z } from "zod";
import { updateFieldVisibility } from "@/lib/utils/updateFieldVisibility";
import { checkRemoveValidationCondition } from "@/lib/utils/checkRemoveValidationCondition";

const getInitialValues = (
  formKey: string,
  schema: IFieldSchema[],
  persistFormResponse: "localStorage" | "sessionStorage" | undefined,
  checkboxes:
    | {
        className?: string | undefined;
        items: IFieldSchema[];
      }
    | undefined
): Record<string, any> => {
  try {
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
  } catch (error) {
    throw new Error("getInitialValues:\n" + JSON.stringify(error));
  }
};

function onErrorRemoveValidationCheck(
  errors: Record<string, any>,
  schema: IFieldSchema[],
  formResponse: Record<string, any>,
  setCanRemoveValidationFor: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >
): boolean {
  try {
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
          setCanRemoveValidationFor((prev) => {
            return {
              ...prev,
              [key]: true,
            };
          });
        } else {
          setCanRemoveValidationFor((prev) => {
            return {
              ...prev,
              [key]: false,
            };
          });
        }
        return fieldValidationRemoveApproved;
      }
    );

    const isEveryCheckValid = allRemoveValidationChecks.every((valid) => valid);

    return isEveryCheckValid;
  } catch (error) {
    throw new Error("onErrorRemoveValidationCheck:\n" + JSON.stringify(error));
  }
}

function onChangeRemoveValidationCheck(
  schema: IFieldSchema[],
  formResponse: Record<string, any>,
  setCanRemoveValidationFor: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >
) {
  const isEveryCheckValid = Object.keys(formResponse).map((key) => {
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
      setCanRemoveValidationFor((prev) => {
        return {
          ...prev,
          [key]: true,
        };
      });
    } else {
      setCanRemoveValidationFor((prev) => {
        return {
          ...prev,
          [key]: false,
        };
      });
    }
    return fieldValidationRemoveApproved;
  });
  return isEveryCheckValid;
}

function useFormState(
  formName: string,
  schema: IFieldSchema[],
  persistFormResponse: "localStorage" | "sessionStorage" | undefined,
  checkboxes:
    | {
        className?: string | undefined;
        items: IFieldSchema[];
      }
    | undefined,
  onChange?: (
    formResponse: Record<string, any>,
    formErrors: FieldErrors<Record<string, any>>,
    canRemoveValidationFor: Record<string, boolean>
  ) => void,
  validationMode?:
    | "onBlur"
    | "onChange"
    | "onSubmit"
    | "onTouched"
    | "all"
    | undefined,
  reValidateMode?: "onBlur" | "onChange" | "onSubmit" | undefined
) {
  const formKey = formName + "_schema_form";
  const defaultValues = getInitialValues(
    formKey,
    schema,
    persistFormResponse,
    checkboxes
  );

  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [canRemoveValidationFor, setCanRemoveValidationFor] = useState<
    Record<string, boolean>
  >({});
  const [visibleFields, setVisibleFields] = useState(
    new Set(schema.map((item) => item.key))
  );

  const zodSchema = useMemo(() => {
    const allFields = checkboxes ? [...schema, ...checkboxes.items] : schema;
    return generateDynamicSchema(allFields);
  }, [checkboxes, schema]);

  const formMethods = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    mode: validationMode ? validationMode : "onChange",
    reValidateMode: reValidateMode ? reValidateMode : "onChange",
    defaultValues: defaultValues,
  });

  const handleOnChange = useCallback(() => {
    if (onChange) {
      const formResponse = formMethods.getValues();
      onChange(
        formResponse,
        formMethods.formState.errors,
        canRemoveValidationFor
      );
      formMethods.clearErrors();
    }
  }, [onChange, formMethods, canRemoveValidationFor]);

  useEffect(() => {
    const subscription = formMethods.watch((_, { type }) => {
      if (type !== "focus") {
        handleOnChange();
      }
    });
    return () => subscription.unsubscribe();
  }, [handleOnChange, formMethods]);

  useEffect(() => {
    onChangeRemoveValidationCheck(
      schema,
      formMethods.getValues(),
      setCanRemoveValidationFor
    );
  }, [schema, formMethods, setCanRemoveValidationFor]);

  useEffect(() => {
    updateFieldVisibility(schema, formMethods.getValues(), setVisibleFields);
  }, [schema, formMethods, setVisibleFields]);

  return {
    formKey,
    allFields: checkboxes ? [...schema, ...checkboxes.items] : schema,
    formState: formMethods.formState,
    formMethods,
    visibleFields,
    setVisibleFields,
    submitButtonLoading,
    setSubmitButtonLoading,
    canRemoveValidationFor,
    setCanRemoveValidationFor,
  };
}

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
        const formResponse = formMethods.watch();
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
