import React, { useEffect } from "react";
import SchemaFormProvider, {
  useSchemaFormContext,
} from "@/context/FormContext";
import { FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { IShadcnSchemaFormProps } from "@/form.interface";
import { ThemeProvider, useTheme } from "@/context/ThemeProvider";

const ShadcnFormBody = <TFieldValues extends FieldValues>({
  card,
  theme,
  renderHeader,
  renderFormFields,
  renderFooter,
}: IShadcnSchemaFormProps<TFieldValues>) => {
  const { setTheme } = useTheme();
  const formContext = useSchemaFormContext<TFieldValues>();
  const {
    formMethods,
    formFields,
    formTitle,
    formKey,
    formDescription,
    visibleFields,
    submitButtonLoading,
    handleOnInvalidSubmit,
    handleOnSubmit,
    useFieldArrayGetter,
  } = formContext;
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

  return (
    <form
      key={formKey}
      onSubmit={formMethods.handleSubmit(handleOnSubmit, handleOnInvalidSubmit)}
    >
      <Container>
        <Header>
          {renderHeader ? (
            renderHeader(formContext)
          ) : (
            <React.Fragment>
              <Title>{formTitle}</Title>
              <Description>{formDescription}</Description>
            </React.Fragment>
          )}
        </Header>
        <Content>
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
              {formFields.map((formField) => {
                if (visibleFields?.has(formField.key)) {
                  return (
                    <FormField
                      key={formField.key}
                      control={formMethods.control}
                      name={formField.key}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{formField.title}</FormLabel>
                          <FormControl>
                            {formField.render ? (
                              formField.render(
                                formField,
                                field,
                                formMethods,
                                useFieldArrayGetter
                              )
                            ) : (
                              <Input
                                type={formField.type}
                                placeholder={formField.placeholder}
                                {...field}
                              />
                            )}
                          </FormControl>
                          <FormDescription>
                            {formField.description}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                }
              })}
            </React.Fragment>
          )}
        </Content>
        <Footer>
          {renderFooter ? (
            renderFooter(formContext)
          ) : (
            <Button type="submit" loading={submitButtonLoading}>
              Submit
            </Button>
          )}
        </Footer>
      </Container>
    </form>
  );
};

const ShadcnForm = <TFieldValues extends FieldValues>(
  props: IShadcnSchemaFormProps<TFieldValues>
) => {
  return (
    <ThemeProvider
      defaultTheme={props.theme}
      storageKey="adimis-react-schema-form-theme"
      themeColors={props.themeColors}
    >
      <SchemaFormProvider {...props}>
        <ShadcnFormBody {...props} />
      </SchemaFormProvider>
    </ThemeProvider>
  );
};

export default ShadcnForm;
