import { numberField } from "./numberField";
import { NumberInput } from "./NumberInput";
import { formStory, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "fields/numberField",
};

export const Required = formStory({
  args: {
    fields: {
      height: numberField({ name: "height" }),
    },
    children: ({ fields }) => (
      <NumberInput field={fields.height} label="Your height" />
    ),
  },
});

export const Optional = formStory({
  args: {
    fields: {
      petCount: numberField({ name: "petCount" }).optional(),
    },
    children: ({ fields }) => (
      <NumberInput field={fields.petCount} label="Pet count" />
    ),
  },
});
