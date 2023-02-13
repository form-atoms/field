import { numberField } from "@form-atoms/field";
import { z } from "zod";

import { SliderField } from "./SliderField";
import { FormStory, meta, optionalField } from "../stories";

export default {
  title: "SliderField",
  ...meta,
};

const confidence = numberField({
  schema: z
    .number({ required_error: "Please adjust your confidence" })
    .min(0)
    .max(100),
});

export const Required: FormStory = {
  args: {
    fields: { confidence },
    children: ({ required }) => (
      <SliderField
        min={0}
        max={100}
        field={confidence}
        label="Confidence"
        required={required}
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
    fields: { confidence: optional },
    children: () => (
      <SliderField min={0} max={100} field={optional} label="Confidence" />
    ),
  },
};
