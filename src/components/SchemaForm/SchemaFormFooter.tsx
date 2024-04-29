import React from "react";
import { SchemaFormFooterProps } from "./interface";
import SchemaFormButtons from "./SchemaFormButtons";
import SchemaFormCheckbox from "./SchemaFormCheckbox";

function SchemaFormFooter({
  renderFooter,
  links,
  form,
  formResponse,
  formKey,
  renderButtons,
  submitButton,
  submitButtonLoading,
  checkboxes,
  canRemoveValidationFor,
  footerClassName,
}: SchemaFormFooterProps) {
  const emptyPersistedFormState = () =>
    localStorage.removeItem(formKey.toString());

  return renderFooter ? (
    <React.Fragment>
      {renderFooter(
        form.watch(),
        form.handleSubmit,
        form.formState.errors,
        emptyPersistedFormState,
        canRemoveValidationFor
      )}
    </React.Fragment>
  ) : (
    <div>
      <div>{links}</div>

      <div
        className={
          footerClassName ? footerClassName : "grid grid-rows-2 gap-2 mt-5"
        }
      >
        <SchemaFormButtons
          formResponse={formResponse}
          formKey={formKey}
          renderButtons={renderButtons}
          submitButton={submitButton}
          submitButtonLoading={submitButtonLoading}
          form={form}
          canRemoveValidationFor={canRemoveValidationFor}
        />
      </div>
      <div
        className={
          checkboxes?.className
            ? checkboxes.className
            : "flex justify-between items-center gap-4 mt-5"
        }
      >
        {checkboxes?.items &&
          checkboxes.items.map((formItem) => (
            <div key={formItem.key}>
              <SchemaFormCheckbox control={form.control} formItem={formItem} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default SchemaFormFooter;
