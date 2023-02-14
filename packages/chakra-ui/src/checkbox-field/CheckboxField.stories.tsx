import { checkboxField } from "@form-atoms/field";
import React from "react";

import { CheckboxField } from "./CheckboxField";
import { FormStory, meta } from "../stories";

export default {
  title: "CheckboxField",
  ...meta,
};

const termsOfService = checkboxField();

export const Required: FormStory = {
  args: {
    fields: { termsOfService },
    children: () => (
      <CheckboxField field={termsOfService}>Terms and conditions</CheckboxField>
    ),
  },
};
