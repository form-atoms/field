import { ReactNode } from "react";

import { FieldLabel, Select, SelectProps } from "..";
import {
  ZodFieldValue,
  booleanField,
  numberField,
  stringArrayField,
  stringField,
} from "../../fields";
import { OptionFieldAtom, OptionValue } from "../../hooks";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";
import { FieldErrors } from "../field-errors";

export default {
  ...meta,
  title: "components/Select",
};

const SelectField = <
  Option,
  Field extends OptionFieldAtom,
  TOptionValue extends OptionValue = ZodFieldValue<Field>
>({
  field,
  label,
  ...props
}: {
  label: ReactNode;
} & SelectProps<Option, Field, TOptionValue>) => (
  <div style={{ margin: "20px 0" }}>
    <FieldLabel field={field} label={label} />
    <Select {...props} field={field} />
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
        getLabel={(value) => `${value} star(s)`}
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

export const RequiredArrayString: FormStory = {
  name: "Multiple select - Required Array<string>",
  args: fixArgs({
    fields: {
      visitedCountries: stringArrayField(),
    },
    children: ({ fields }) => (
      <SelectField
        multiple
        field={fields.visitedCountries}
        label="Visited countried"
        options={countryOptions}
        getValue={({ key }) => key}
        getLabel={({ name }) => name}
      />
    ),
  }),
};
