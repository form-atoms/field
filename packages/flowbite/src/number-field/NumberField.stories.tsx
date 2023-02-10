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

export const Primary = Template.bind({});
Primary.args = {
  form: formAtom({ amount }),
  children: <NumberField field={amount} label="Amount" />,
};

export const Required = Template.bind({});
Required.args = {
  form: formAtom({ required }),
  children: <ValidatedNumberField field={required} label="Amount" />,
};

export const Optional = Template.bind({});
Optional.args = {
  form: formAtom({ optional }),
  children: <ValidatedNumberField field={optional} label="Amount" />,
};
