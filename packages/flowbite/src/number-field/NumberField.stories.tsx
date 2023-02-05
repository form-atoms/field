import React from "react";
import { NumberField } from "./NumberField";
import { fieldAtom, formAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";
import { Template } from "../stories";

export default {
  title: "NumberField",
  component: NumberField,
};

const formFields = {
  quantity: fieldAtom({
    value: 0,
    validate: zodValidate(z.number().min(1).max(5), { on: "change" }),
  }),
};

export const Primary = Template.bind({});
Primary.args = {
  form: formAtom(formFields),
  children: <NumberField field={formFields.quantity} label="Qty." />,
};
