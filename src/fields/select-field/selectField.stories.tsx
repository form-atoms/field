import { selectField } from "./selectField";
import { useSelectFieldProps } from "./useSelectFieldProps";
import { SelectFieldProps, useSelectOptions } from "./useSelectOptions";
import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "selectField",
};

const SelectInput = <Option,>({
  field,
  label,
  getValue,
  getLabel,
  options,
  placeholder,
}: SelectFieldProps<Option>) => {
  const props = useSelectFieldProps(field);

  const { renderOptions, placeholderOption } = useSelectOptions(field, {
    getValue,
    getLabel,
    options,
    placeholder,
  });

  return (
    <div style={{ margin: "20px 0" }}>
      <FieldLabel field={field} label={label} />
      <select {...props}>
        {placeholderOption}
        {renderOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
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
      country: selectField(),
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
      attachment: selectField({
        optional: true,
      }),
    },
    children: ({ fields }) => (
      <SelectInput
        field={fields.attachment}
        label="Pet count"
        options={countryOptions}
        getValue={({ key }) => key}
        getLabel={({ name }) => name}
      />
    ),
  }),
};
