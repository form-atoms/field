import { NumberField } from "./NumberField";
import { ValidatedNumberField } from "./ValidatedNumberField";
import { FormStory, StoryForm } from "../stories";
import { numberField } from "@form-atoms/field";

export default {
  title: "NumberField",
  component: StoryForm,
};

const amount = numberField();
const required = numberField();
const optional = numberField({
  optional: true,
});

export const Primary: FormStory = {
  args: {
    fields: { amount },
    children: <NumberField field={amount} label="Amount" />,
  },
};

export const Required: FormStory = {
  args: {
    fields: { required },
    children: <ValidatedNumberField field={required} label="Amount" />,
  },
};

export const Optional: FormStory = {
  args: {
    fields: { optional },
    children: <ValidatedNumberField field={optional} label="Amount" />,
  },
};
