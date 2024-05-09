import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { IMultiStepShadcnSchemaFormProps } from "@/form.interface";
import { ThemeProvider, useTheme } from "@/context/ThemeProvider";
import SchemaFormProvider, {
  useSchemaFormContext,
} from "@/context/FormContext";
import { TabsTrigger, Tabs, TabsContent, TabsList } from "./ui/tabs";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import useEnterKeySubmit from "@/hooks/useEnterKeySubmit";

const MultiStepShadcnFormBody = <TFieldValues extends FieldValues>({
  card,
  theme,
  multiStepFormSteps,
  renderFormFields,
  hideSubmitButton,
  disableSubmitButton,
  submitButtonClassName,
  submitButtonStyle,
}: IMultiStepShadcnSchemaFormProps<TFieldValues>) => {
  const { setTheme } = useTheme();
  const formContext = useSchemaFormContext<TFieldValues>();
  const {
    formMethods,
    formFields,
    formLabel,
    formKey,
    formDescription,
    visibleFields,
    formDisabled,
    submitButtonLoading,
    handleOnInvalidSubmit,
    handleOnSubmit,
    useFieldArrayGetter,
  } = formContext;
  const [currentStep, setCurrentStep] = useState(
    Object.keys(multiStepFormSteps ? multiStepFormSteps : {})[0]
  );

  const Container = card ? Card : "div";
  const Content = card ? CardContent : "div";
  const Header = card ? CardHeader : "div";
  const Title = card ? CardTitle : "h2";
  const Description = card ? CardDescription : "p";
  const Footer = card ? CardFooter : "div";

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [theme, setTheme]);

  const stepKeys = Object.keys(multiStepFormSteps ? multiStepFormSteps : {});
  const isLastStep = currentStep === stepKeys[stepKeys.length - 1];
  const isFirstStep = currentStep === stepKeys[0];

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

  useEnterKeySubmit(
    formMethods.handleSubmit(handleOnSubmit, handleOnInvalidSubmit),
    formKey
  );

  return (
    <form
      id={formKey}
      key={formKey}
      onSubmit={formMethods.handleSubmit(handleOnSubmit, handleOnInvalidSubmit)}
    >
      <Tabs value={currentStep} onValueChange={setCurrentStep}>
        <Container>
          <Header>
            <TabsList className="mb-2">
              {Object.entries(multiStepFormSteps).map(([key, value]) => (
                <TabsTrigger key={key} value={key}>
                  {value.stageLabel}
                </TabsTrigger>
              ))}
            </TabsList>
            <Title>{formLabel}</Title>
            <Description>{formDescription}</Description>
          </Header>
          {Object.entries(multiStepFormSteps).map(([key, value]) => (
            <TabsContent key={key} value={key}>
              <Content>
                <React.Fragment>
                  {renderFormFields ? (
                    renderFormFields(
                      formContext,
                      FormField,
                      FormItem,
                      FormControl,
                      FormMessage,
                      FormLabel,
                      FormDescription
                    )
                  ) : (
                    <React.Fragment>
                      {value.fields &&
                        value.fields.map((fieldName) => {
                          if (!fieldName || !visibleFields.has(fieldName))
                            return null;
                          const formItem = formFields.find(
                            (item) => item.key === fieldName
                          );
                          if (!formItem) return null;

                          return (
                            <div className="mt-3" key={`${formItem.key}-div`}>
                              <FormField
                                key={formItem.key}
                                control={formMethods.control}
                                name={formItem.key}
                                disabled={formDisabled}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{formItem.title}</FormLabel>
                                    <FormControl>
                                      {formItem.render ? (
                                        formItem.render(
                                          formItem,
                                          field,
                                          formMethods,
                                          useFieldArrayGetter
                                        )
                                      ) : (
                                        <Input
                                          type={formItem.type}
                                          placeholder={formItem.placeholder}
                                          {...field}
                                        />
                                      )}
                                    </FormControl>
                                    <FormDescription>
                                      {formItem.description}
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          );
                        })}
                    </React.Fragment>
                  )}
                </React.Fragment>
              </Content>
              <Footer className="flex justify-between items-center">
                <Button
                  onClick={handlePrev}
                  disabled={isFirstStep}
                  variant={"outline"}
                >
                  Prev
                </Button>
                {isLastStep ? (
                  formDisabled ? (
                    <Button
                      disabled={true}
                      className={submitButtonClassName}
                      style={submitButtonStyle}
                    >
                      Next
                    </Button>
                  ) : (
                    !hideSubmitButton && (
                      <Button
                        type="submit"
                        loading={submitButtonLoading}
                        disabled={disableSubmitButton}
                        className={submitButtonClassName}
                        style={submitButtonStyle}
                      >
                        Submit
                      </Button>
                    )
                  )
                ) : (
                  <Button onClick={handleNext} disabled={isLastStep}>
                    Next
                  </Button>
                )}
              </Footer>
            </TabsContent>
          ))}
        </Container>
      </Tabs>
    </form>
  );
};

const MultiStepShadcnForm = <TFieldValues extends FieldValues>(
  props: IMultiStepShadcnSchemaFormProps<TFieldValues>
) => {
  return (
    <ThemeProvider
      defaultTheme={props.theme}
      storageKey="adimis-react-schema-form-theme"
      themeColors={props.themeColors}
    >
      <SchemaFormProvider {...props}>
        <MultiStepShadcnFormBody {...props} />
      </SchemaFormProvider>
    </ThemeProvider>
  );
};

export default MultiStepShadcnForm;
