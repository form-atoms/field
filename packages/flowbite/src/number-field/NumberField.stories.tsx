import React from "react";
import { NumberField } from "./NumberField";
import { formAtom } from "form-atoms";
import { Template } from "../stories";
import { numberField } from "@react-last-field/field";

export default {
  title: "NumberField",
  component: NumberField,
};

const formFields = {
  quantity: numberField(),
};

export const Primary = Template.bind({});
Primary.args = {
  form: formAtom(formFields),
  children: <NumberField field={formFields.quantity} label="Qty." />,
};
