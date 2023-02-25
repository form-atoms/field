import { Meta, StoryObj } from "@storybook/react";

import { FieldLabel } from "./FieldLabel";
import { textField } from "../text-field";

export type LabelStory = StoryObj<typeof meta>;

const meta = {
  component: FieldLabel,
} satisfies Meta<typeof FieldLabel>;

export default {
  title: "FieldLabel",
  component: FieldLabel,
};

export const Primary: LabelStory = {
  args: { field: textField(), label: "First Name" },
  render: ({ field, label }) => (
    <div>
      <FieldLabel field={field} label={label} />
      {/* NOTE: the field atom's .toString() is used to get it's id! 🤯 */}
      <input type="text" id={`${field}`} />
    </div>
  ),
};

export const WithRenderProp: LabelStory = {
  args: { field: textField(), label: "First Name" },
  render: ({ field, label }) => (
    <div>
      <FieldLabel field={field} label={label}>
        {/* Render custom component */}
        {(props) => <label {...props} style={{ textTransform: "uppercase" }} />}
      </FieldLabel>
      <input type="text" id={`${field}`} />
    </div>
  ),
};
