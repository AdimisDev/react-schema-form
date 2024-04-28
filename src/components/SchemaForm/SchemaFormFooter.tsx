import React from "react";
import { SchemaFormFooterProps } from "../../interfaces/SchemaForm.interface";
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
}: SchemaFormFooterProps) {
  return renderFooter ? (
    <React.Fragment>{renderFooter(form.watch())}</React.Fragment>
  ) : (
    <div>
      <div>{links}</div>

      <div className="grid grid-rows-2 gap-2 mt-5">
        <SchemaFormButtons
          formResponse={formResponse}
          key={formKey}
          renderButtons={renderButtons}
          submitButton={submitButton}
          submitButtonLoading={submitButtonLoading}
          form={form}
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
