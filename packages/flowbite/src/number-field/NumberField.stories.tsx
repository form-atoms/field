import { NumberField } from "./NumberField";
import { ValidatedNumberField } from "./ValidatedNumberField";
import { formAtom } from "form-atoms";
import { Template } from "../stories";
import { numberField, fieldAtomWithValidation } from "@form-atoms/field";

export default {
  title: "NumberField",
  component: NumberField,
};

const amount = numberField();
const required = numberField();
const optional = numberField({
  optional: true,
});

export const Primary = {
  render: Template.bind({}),

  args: {
    form: formAtom({ amount }),
    children: <NumberField field={amount} label="Amount" />,
  },
};

export const Required = {
  render: Template.bind({}),

  args: {
    form: formAtom({ required }),
    children: <ValidatedNumberField field={required} label="Amount" />,
  },
};

export const Optional = {
  render: Template.bind({}),

  args: {
    form: formAtom({ optional }),
    children: <ValidatedNumberField field={optional} label="Amount" />,
  },
};
