import { numberField } from "@form-atoms/field";

import { NumberField } from "./NumberField";
import { FormStory, meta, optionalField } from "../stories";

export default {
  title: "NumberField",
  ...meta,
};

const required = numberField();

export const Required: FormStory = {
  args: {
    fields: { required },
    children: (args) => (
      <NumberField field={required} label="Amount" {...args} />
    ),
  },
};

const optional = numberField({
  optional: true,
});
export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { optional },
    children: () => <NumberField field={optional} label="Amount" />,
  },
};
