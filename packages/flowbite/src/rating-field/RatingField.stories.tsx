import { RatingField } from "./RatingField";
import { meta, FormStory } from "../stories";
import { numberField } from "@form-atoms/field";

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
