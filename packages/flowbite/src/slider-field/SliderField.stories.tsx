import { numberField } from "@form-atoms/field";
import { z } from "zod";

import { SliderField } from "./SliderField";
import { FormStory, meta, optionalField } from "../stories";

export default {
  title: "SliderField",
  ...meta,
};

const rating = numberField({
  schema: z
    .number({ required_error: "Please adjust your confidence" })
    .min(0)
    .max(100),
});

export const Required: FormStory = {
  args: {
    fields: { rating },
    children: (args) => (
      <SliderField
        min={0}
        max={100}
        field={rating}
        label="Confidence"
        {...args}
      />
    ),
  },
};

const optional = numberField({
  optional: true,
  schema: z
    .number({ required_error: "Please adjust your confidence" })
    .min(0)
    .max(100),
});
export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { rating: optional },
    children: () => (
      <SliderField min={0} max={100} field={optional} label="Confidence" />
    ),
  },
};
