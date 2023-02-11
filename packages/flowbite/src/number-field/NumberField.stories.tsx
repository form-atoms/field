import { NumberField } from "./NumberField";
import { FormStory, StoryForm } from "../stories";
import { numberField } from "@form-atoms/field";

export default {
  title: "NumberField",
  component: StoryForm,
};

const required = numberField();
const optional = numberField({
  optional: true,
});

export const Required: FormStory = {
  args: {
    fields: { required },
    children: <NumberField field={required} label="Amount" />,
  },
};

export const Optional: FormStory = {
  args: {
    fields: { optional },
    children: <NumberField field={optional} label="Amount" />,
  },
};
