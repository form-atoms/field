import { numberField } from "@form-atoms/field";

import { RatingField } from "./RatingField";
import { FormStory, meta, optionalField } from "../stories";

export default {
  title: "RatingField",
  ...meta,
};

const fields = {
  rating: numberField(),
};

export const Required: FormStory = {
  args: {
    fields,
    children: (args) => (
      <RatingField
        field={fields.rating}
        label="Rate your experience"
        {...args}
      />
    ),
  },
};

const optionalRating = numberField({ optional: true });

export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { optionalRating },
    children: () => (
      <RatingField field={optionalRating} label="Rate your experience" />
    ),
  },
};
