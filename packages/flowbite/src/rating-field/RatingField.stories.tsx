import { RatingField } from "./RatingField";
import { StoryForm, FormStory } from "../stories";
import { numberField } from "@form-atoms/field";

export default {
  title: "RatingField",
  component: StoryForm,
};

const fields = {
  rating: numberField(),
};

export const Primary: FormStory = {
  args: {
    fields,
    children: (
      <RatingField field={fields.rating} label="Rate your experience" />
    ),
  },
};
