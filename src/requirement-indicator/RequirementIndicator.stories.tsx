import { Meta, StoryObj } from "@storybook/react";

import { ValidatedFieldAtom } from "../field";
import { FieldLabel } from "../field-label";
import { numberField } from "../number-field";

import { Props, RequirementIndicator } from ".";

export type StoryType = StoryObj<typeof meta>;

const QuantityField = <Field extends ValidatedFieldAtom<any>>({
  field,
  kind,
}: Props<Field>) => (
  <>
    <FieldLabel
      field={field}
      label={
        <>
          Quantity <RequirementIndicator kind={kind} field={field} />
        </>
      }
    />
    <input type="number" id={`${field}`} />
  </>
);

const meta = {
  title: "RequirementIndicator",
  component: QuantityField,
} satisfies Meta<typeof QuantityField>;

export default meta;

export const Intro: StoryType = {
  args: { field: numberField() },
  render: () => (
    <>
      <QuantityField field={numberField()} kind="icon" />
      <QuantityField field={numberField()} kind="label" />
      <QuantityField field={numberField({ optional: true })} kind="icon" />
      <QuantityField field={numberField({ optional: true })} kind="label" />
    </>
  ),
};

export const Required: StoryType = {
  args: { field: numberField() },
};

export const RequiredLabel: StoryType = {
  args: { field: numberField(), kind: "label" },
};

export const Optional: StoryType = {
  args: { field: numberField({ optional: true }) },
};

export const OptionalLabel: StoryType = {
  args: { field: numberField({ optional: true }), kind: "label" },
};
