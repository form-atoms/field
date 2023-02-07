import { NumberField } from "./NumberField";
import { formAtom } from "form-atoms";
import { Template } from "../stories";
import { numberField } from "@form-atoms/field";

export default {
  title: "NumberField",
  component: NumberField,
};

const formFields = {
  amount: numberField(),
};

export const Primary = Template.bind({});
Primary.args = {
  form: formAtom(formFields),
  children: <NumberField field={formFields.amount} label="Amount" />,
};
