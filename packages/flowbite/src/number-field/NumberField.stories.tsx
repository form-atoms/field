import { numberField } from "@form-atoms/field";

import { NumberField } from "./NumberField";
import { FormStory, meta, optionalField } from "../stories";

export default {
  title: "NumberField",
  ...meta,
};

const amount = numberField();

export const Required: FormStory = {
  args: {
    fields: { amount },
    children: ({ required }) => (
      <NumberField field={amount} label="Amount" required={required} />
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
