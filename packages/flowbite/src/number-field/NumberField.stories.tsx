import { numberField } from "@form-atoms/field";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";

import { NumberField } from "./NumberField";
import { FormStory, meta, optionalField } from "../stories";

export default {
  title: "NumberField",
  ...meta,
};

const amount = numberField();

export const Required: FormStory = {
  args: {
    fields: { amount },
    children: ({ required }) => (
      <NumberField field={amount} label="Amount" required={required} />
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("spinbutton");

    await userEvent.type(input, "420", {
      delay: 300,
    });

    await userEvent.clear(input);
  },
};

const optional = numberField({
  optional: true,
});
export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { optional },
    children: () => <NumberField field={optional} label="Amount" />,
  },
};
