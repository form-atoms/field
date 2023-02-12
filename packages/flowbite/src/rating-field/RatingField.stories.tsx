import { numberField } from "@form-atoms/field";

import { RatingField } from "./RatingField";
import { FormStory, meta } from "../stories";

export default {
  title: "RatingField",
  ...meta,
};

const fields = {
  rating: numberField(),
};

export const Primary: FormStory = {
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
