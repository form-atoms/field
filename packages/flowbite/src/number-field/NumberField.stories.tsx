import { numberField } from "@form-atoms/field";

import { NumberField } from "./NumberField";
import { FormStory, meta } from "../stories";

export default {
  title: "NumberField",
  ...meta,
};

const required = numberField();
const optional = numberField({
  optional: true,
});

export const Required: FormStory = {
  args: {
    fields: { required },
    children: (args) => (
      <NumberField field={required} label="Amount" {...args} />
    ),
  },
};

export const Optional: FormStory = {
  args: {
    fields: { optional },
    children: (args) => (
      <NumberField field={optional} label="Amount" {...args} />
    ),
  },
};
