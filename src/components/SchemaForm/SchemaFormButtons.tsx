import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SchemaFormFooterProps } from "./interface";

function SchemaFormButtons({
  submitButton,
  submitButtonLoading,
  formResponse,
  renderButtons,
  canRemoveValidationFor,
  form,
  formKey,
}: SchemaFormFooterProps) {
  const emptyPersistedFormState = () =>
    localStorage.removeItem(formKey.toString());

  const buttons: React.ReactNode[] = renderButtons
    ? renderButtons(
        formResponse,
        form.handleSubmit,
        form.formState.errors,
        emptyPersistedFormState,
        canRemoveValidationFor
      )
    : [];

  if (!submitButton?.hideSubmit) {
    const isLoading =
      submitButton?.loading !== undefined
        ? submitButton.loading
        : submitButtonLoading;
    buttons.unshift(
      <Button
        key="submit"
        className={cn(
          submitButton?.submitButtonClassName
            ? submitButton?.submitButtonClassName
            : "w-full col-span-4"
        )}
        type="submit"
        variant={submitButton?.submitButtonVarient || "default"}
        loading={isLoading}
        disabled={submitButton?.disabledSubmit}
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

export default SchemaFormButtons;
