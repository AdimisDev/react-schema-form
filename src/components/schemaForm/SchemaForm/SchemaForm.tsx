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
import renderField from "../fields/renderField";
import { ISchemaFormProps } from "../interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import SchemaFormFooter from "../partials/SchemaFormFooter";
import { useFormState } from "../hooks/useFormState";
import { onErrorRemoveValidationCheck } from "../utils/removeValidationCheck";

export function SchemaForm({
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
  showValidationErrors = true,
  panel = true,
  formClassName,
  fieldsLayoutClassName,
  footerClassName,
  validationMode,
  reValidateMode,
}: ISchemaFormProps) {
  const Container = panel ? Card : "div";
  const ContainerContent = panel ? CardContent : "div";
  const ContainerHeader = panel ? CardHeader : "div";

  const {
    formKey,
    formMethods,
    visibleFields,
    submitButtonLoading,
    setSubmitButtonLoading,
    canRemoveValidationFor,
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
              className={`${formClassName ? formClassName : "gap-4"}`}
              onSubmit={formMethods.handleSubmit(
                handleSubmit,
                handleInvalidSubmit
              )}
            >
              <div
                className={
                  fieldsLayoutClassName
                    ? fieldsLayoutClassName
                    : "grid grid-row-* grid-col-*"
                }
              >
                {schema.map(
                  (formItem) =>
                    visibleFields.has(formItem.key) && (
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
                    )
                )}
              </div>
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
                footerClassName={footerClassName}
              />
            </form>
          </Form>
        </ContainerContent>
      </Container>
    )
  );
}
