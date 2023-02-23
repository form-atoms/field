import { Meta, StoryObj } from "@storybook/react";

import { RequirementIndicator } from "./RequirementIndicator";
import { numberField } from "../number-field";

import { FieldLabel, ValidatedFieldAtom } from ".";

export type LabelStory = StoryObj<typeof meta>;

const StoryLabel = ({ field }: { field: ValidatedFieldAtom<any> }) => {
  return <FieldLabel field={field} label="quantity" />;
};

const meta = {
  component: StoryLabel,
} satisfies Meta<typeof StoryLabel>;

export default {
  title: "FieldLabel",
  component: StoryLabel,
};

export const Required: LabelStory = {
  args: { field: numberField() },
  render: (args) => (
    <>
      <FieldLabel
        {...args}
        label={
          <>
            Quantity <RequirementIndicator field={args.field} />
          </>
        }
      />
      <input type="number" id={`${args.field}`} />
    </>
  ),
};

export const RequiredLabel: LabelStory = {
  args: { field: numberField() },
  render: (args) => (
    <>
      <FieldLabel
        {...args}
        label={
          <>
            Quantity <RequirementIndicator kind="label" field={args.field} />
          </>
        }
      />
      <input type="number" id={`${args.field}`} />
    </>
  ),
};

export const Optional: LabelStory = {
  args: { field: numberField({ optional: true }) },
  render: (args) => (
    <>
      <FieldLabel
        {...args}
        label={
          <>
            Quantity <RequirementIndicator field={args.field} />
          </>
        }
      />
      <input type="number" id={`${args.field}`} />
    </>
  ),
};

export const OptionalLabel: LabelStory = {
  args: { field: numberField({ optional: true }) },
  render: (args) => (
    <>
      <FieldLabel
        {...args}
        label={
          <>
            Quantity <RequirementIndicator kind="label" field={args.field} />
          </>
        }
      />
      <input type="number" id={`${args.field}`} />
    </>
  ),
};
