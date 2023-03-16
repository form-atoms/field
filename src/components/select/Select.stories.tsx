import { ReactNode } from "react";
import { z } from "zod";

import { FieldLabel, Select, SelectProps } from "..";
import { booleanField, numberField, stringField, zodField } from "../../fields";
import type { SelectField } from "../../hooks";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";
import { FieldErrors } from "../field-errors";

export default {
  ...meta,
  title: "components/Select",
};

const SelectField = <Option, Field extends SelectField>({
  field,
  label,
  ...props
}: {
  label: ReactNode;
} & SelectProps<Option, Field>) => (
  <div style={{ margin: "20px 0" }}>
    <FieldLabel field={field} label={label} />
    <Select field={field} {...props} />
    <FieldErrors field={field} />
  </div>
);

const countryOptions = [
  { name: "Slovak Republic", key: "SK" },
  { name: "Czech Republic", key: "CZ" },
  { name: "Poland", key: "PL" },
  { name: "Hungary", key: "HU" },
];

export const RequiredString: FormStory = {
  args: fixArgs({
    fields: {
      country: stringField(),
    },
    children: ({ fields }) => (
      <SelectField
        field={fields.country}
        label="Country of Origin"
        options={countryOptions}
        getValue={({ key }) => key}
        getLabel={({ name }) => name}
      />
    ),
  }),
};

export const OptionalString: FormStory = {
  args: fixArgs({
    fields: {
      country: stringField({ optional: true }),
    },
    children: ({ fields }) => (
      <SelectField
        field={fields.country}
        label="Country of Origin"
        options={countryOptions}
        getValue={({ key }) => key}
        getLabel={({ name }) => name}
      />
    ),
  }),
};

const ratingOptions = [5, 4, 3, 2, 1];

export const RequiredNumber: FormStory = {
  args: fixArgs({
    fields: {
      rating: numberField(),
    },
    children: ({ fields }) => (
      <SelectField
        field={fields.rating}
        label="How do you rate this docs?"
        options={ratingOptions}
        getValue={(value) => value}
        getLabel={(value) => Array(value + 1).join("🌟")}
      />
    ),
  }),
};

const approvalOptions = [
  { label: "I approve this message", key: true },
  { label: "I have some comments", key: false },
];

export const RequiredBoolean: FormStory = {
  args: fixArgs({
    fields: {
      approved: booleanField(),
    },
    children: ({ fields }) => (
      <SelectField
        field={fields.approved}
        label="Do you approve this message?"
        options={approvalOptions}
        getValue={({ key }) => key}
        getLabel={({ label }) => label}
      />
    ),
  }),
};

const customers = [
  { name: "Github", city: "San Francisco" },
  { name: "Microsoft", city: "Seattle" },
  { name: "basic IT", city: "Bratislava" },
];

export const RequiredCustomer: FormStory = {
  name: "Required custom type (Customer)",
  parameters: {
    docs: {
      description: {
        story:
          "For custom type, here `{name: string, city: string}`, pass a custom zodField",
      },
    },
  },
  args: fixArgs({
    fields: {
      names: zodField({
        value: undefined,
        schema: z.object(
          { name: z.string(), city: z.string() },
          { required_error: "Please select a customer." }
        ),
      }),
    },
    children: ({ fields }) => (
      <SelectField
        field={fields.names}
        label="Pick a customer"
        options={customers}
        getValue={(addr) => addr}
        getLabel={({ name, city }) => `${name} in ${city}`}
      />
    ),
  }),
};
