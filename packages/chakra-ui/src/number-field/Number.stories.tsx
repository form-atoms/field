import { numberField } from "@form-atoms/field";

import { NumberField } from "./NumberField";
import { FormStory, meta } from "../stories";

export default {
  title: "NumberField",
  ...meta,
};

const quantity = numberField();

export const Required: FormStory = {
  args: {
    fields: { quantity },
    children: ({ required }) => (
      <NumberField field={quantity} label="Qty." required={required} />
    ),
  },
};
