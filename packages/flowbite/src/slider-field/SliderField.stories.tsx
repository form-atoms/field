import { SliderField } from "./SliderField";
import { z } from "zod";
import { FormStory, StoryForm } from "../stories";
import { numberField } from "@form-atoms/field";

export default {
  title: "SliderField",
  component: StoryForm,
};

const rating = numberField({
  schema: z
    .number({ required_error: "Please adjust your confidence" })
    .min(0)
    .max(100),
});

export const Primary: FormStory = {
  args: {
    fields: { rating },
    children: (
      <SliderField min={0} max={100} field={rating} label="Confidence" />
    ),
  },
};
