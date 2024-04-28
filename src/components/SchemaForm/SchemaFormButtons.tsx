import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SchemaFormFooterProps } from "./SchemaForm.interface";

function SchemaFormButtons({
  submitButton,
  submitButtonLoading,
  formResponse,
  renderButtons,
  form,
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
