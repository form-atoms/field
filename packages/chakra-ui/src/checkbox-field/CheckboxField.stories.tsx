import { checkboxField } from "@form-atoms/field";
import React from "react";

import { CheckboxField } from "./CheckboxField";
import { FormStory, meta, optionalField } from "../stories";

export default {
  title: "CheckboxField",
  ...meta,
};

const termsOfService = checkboxField();

export const Required: FormStory = {
  args: {
    fields: { termsOfService },
    children: ({ required }) => (
      <CheckboxField field={termsOfService} required={required}>
        Terms and conditions
      </CheckboxField>
    ),
  },
};

const newsletter = checkboxField({ optional: true });

export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { newsletter },
    children: () => (
      <CheckboxField
        field={newsletter}
        helperText="We'll send you only lit content"
      >
        Subscribe to the newsletter
      </CheckboxField>
    ),
  },
};
