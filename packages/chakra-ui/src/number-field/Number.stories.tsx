import { numberField } from "@form-atoms/field";

import { NumberField } from "./NumberField";
import { FormStory, meta } from "../stories";

export default {
  title: "NumberField",
  ...meta,
};

const quantity = numberField({
  value: 0,
});

export const Required: FormStory = {
  args: {
    fields: { quantity },
    children: () => <NumberField field={quantity} label="Qty." />,
  },
};
