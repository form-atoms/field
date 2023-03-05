import { ReactNode } from "react";

import { FieldLabel, Select, SelectProps } from "..";
import { booleanField, numberField, stringField } from "../../fields";
import { OptionFieldAtom } from "../../hooks";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";
import { FieldErrors } from "../field-errors";

export default {
  ...meta,
  title: "components/Select",
};

const SelectField = <Option, Field extends OptionFieldAtom>({
  field,
  label,
  ...props
}: {
  label: ReactNode;
} & SelectProps<Option, Field>) => (
  <div style={{ margin: "20px 0" }}>
    <FieldLabel field={field} label={label} />
    <Select {...props} field={field} />
    <FieldErrors field={field} />
  </div>
);

const countryOptions = [
  { name: "Slovak Republic", key: "SK" },
  { name: "Czech Republic", key: "CZ" },
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
