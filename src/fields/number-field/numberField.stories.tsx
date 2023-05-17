import { numberField } from "./numberField";
import { NumberInput } from "./NumberInput";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "fields/numberField",
};

export const Required: FormStory = {
  args: fixArgs({
    fields: {
      height: numberField({ name: "height" }),
    },
    children: ({ fields }) => (
      <NumberInput field={fields.height} label="Your height" />
    ),
  }),
};

export const Optional: FormStory = {
  args: fixArgs({
    fields: {
      petCount: numberField({ name: "petCount" }).optional(),
    },
    children: ({ fields }) => (
      <NumberInput field={fields.petCount} label="Pet count" />
    ),
  }),
};
