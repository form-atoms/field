import { ReactNode } from "react";

import { OptionFieldAtom, useOptionFieldProps } from "./useOptionFieldProps";
import { SelectOptionsProps, useSelectOptions } from "..";
import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";
import {
  ZodFieldValue,
  booleanField,
  numberField,
  stringField,
} from "../../fields";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "hooks/useOptionFieldProps",
};

const SelectInput = <Option, Field extends OptionFieldAtom>({
  field,
  label,
  getValue,
  getLabel,
  options,
  placeholder,
}: {
  label: ReactNode;
  field: Field;
} & SelectOptionsProps<Option, ZodFieldValue<Field>>) => {
  const props = useOptionFieldProps(field);

  const { selectOptions } = useSelectOptions({
    field,
    getValue,
    getLabel,
    options,
    placeholder,
  });

  return (
    <div style={{ margin: "20px 0" }}>
      <FieldLabel field={field} label={label} />
      <select {...props}>{selectOptions}</select>
      <div>
        <FieldErrors field={field} />
      </div>
    </div>
  );
};

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
      <SelectInput
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
      country: stringField({
        optional: true,
      }),
    },
    children: ({ fields }) => (
      <SelectInput
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
      <SelectInput
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
      <SelectInput
        field={fields.approved}
        label="Do you approve this message?"
        options={approvalOptions}
        getValue={({ key }) => key}
        getLabel={({ label }) => label}
      />
    ),
  }),
};
