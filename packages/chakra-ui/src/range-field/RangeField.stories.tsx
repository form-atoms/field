import { numberField } from "@form-atoms/field";
import { z } from "zod";

import { RangeField } from "./RangeField";
import { FormStory, meta } from "../stories";

export default {
  title: "RangeField",
  ...meta,
};

const rating = numberField({
  schema: z.number().min(0).max(20),
});

export const Required: FormStory = {
  args: {
    fields: { rating },
    children: ({ required }) => (
      <RangeField
        field={rating}
        defaultValue={3}
        min={0}
        max={20}
        label="Rating"
        required={required}
      />
    ),
  },
};
