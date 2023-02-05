import React from "react";
import { CheckboxField } from "./CheckboxField";
import { fieldAtom, formAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";
import { Template } from "../stories";

export default {
  title: "CheckboxField",
  component: CheckboxField,
};

const termsOfService = fieldAtom({
  name: "tos",
  value: false,
  validate: zodValidate(z.literal(true), { on: "change" }),
});

export const Primary = Template.bind({});
Primary.args = {
  form: formAtom({ termsOfService }),

  children: (
    <CheckboxField
      field={termsOfService}
      helperText="Better read those"
      label="Terms of Service"
    />
  ),
};
