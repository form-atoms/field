import { ReactNode } from "react";

import { StringFieldAtom, stringField } from "./stringField";
import { useSelectFieldProps } from "./useSelectFieldProps";
import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";
import { SelectOptionsProps, useSelectOptions } from "../../hooks";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "fields/stringField",
};

const SelectInput = <Option,>({
  field,
  label,
  getValue,
  getLabel,
  options,
  placeholder,
}: {
  field: StringFieldAtom;
  label: ReactNode;
} & SelectOptionsProps<Option>) => {
  const props = useSelectFieldProps(field);

  const { selectOptions } = useSelectOptions(field, {
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

export const Required: FormStory = {
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

export const Optional: FormStory = {
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
