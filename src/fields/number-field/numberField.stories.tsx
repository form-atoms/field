import { numberField } from "./numberField";
import { NumberInput } from "./NumberInput.mock";
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

export const Initialized = formStory({
  args: {
    fields: {
      count: numberField({ name: "count" }).optional(),
    },
    children: ({ fields }) => (
      <NumberInput field={fields.count} label="Count" initialValue={3} />
    ),
  },
});

export const ExtendSchema = formStory({
  args: {
    fields: {
      degrees: numberField({
        name: "degrees",
        schema: (s) => s.min(0).max(360),
      }),
    },
    children: ({ fields }) => (
      <NumberInput
        field={fields.degrees}
        label="Degrees of an angle (0-360) inclusive"
      />
    ),
  },
});
