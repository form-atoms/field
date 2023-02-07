import { CheckboxField } from "./CheckboxField";
import { fieldAtom, formAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";
import { Template } from "../stories";
import { checkboxField } from "@react-last-field/field";

export default {
  title: "CheckboxField",
  component: CheckboxField,
};

const termsOfService = checkboxField({ name: "tos", required: true });

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
