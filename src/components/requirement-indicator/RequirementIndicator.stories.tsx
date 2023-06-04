import { Meta, StoryObj } from "@storybook/react";

import { ZodField } from "../../fields";
import { numberField } from "../../fields/number-field";
import { FieldLabel } from "../field-label";

import { Props, RequirementIndicator } from ".";

export type StoryType = StoryObj<typeof meta>;

const QuantityField = <Field extends ZodField<any>>({
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
  title: "components/RequirementIndicator",
  component: QuantityField,
} satisfies Meta<typeof QuantityField>;

export default meta;

export const Intro: StoryType = {
  args: { field: numberField() },
  render: () => (
    <>
      <QuantityField field={numberField()} kind="icon" />
      <QuantityField field={numberField()} kind="label" />
      <QuantityField field={numberField().optional()} kind="icon" />
      <QuantityField field={numberField().optional()} kind="label" />
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
  args: { field: numberField().optional() },
};

export const OptionalLabel: StoryType = {
  args: { field: numberField().optional(), kind: "label" },
};
