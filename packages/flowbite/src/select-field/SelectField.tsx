import { Label, Select } from "flowbite-react";
import {
  SelectFieldProps,
  useSelectFieldProps,
  useSelectOptions,
} from "@form-atoms/field";
import { useFieldError } from "../hooks";
import { Field } from "../field";

export const SelectField = <Option,>({
  field,
  options,
  getValue,
  getLabel,
  label,
  placeholder,
  helperText,
  ...uiProps
}: SelectFieldProps<Option>) => {
  const props = useSelectFieldProps(field);
  const { renderOptions, placeholderOption } = useSelectOptions(field, {
    getValue,
    getLabel,
    options,
    placeholder,
  });
  const { color, error } = useFieldError(field);

  return (
    <Field>
      {label && (
        <Label color={color} htmlFor={props.id}>
          {label}
        </Label>
      )}
      <Select
        role="combobox"
        {...uiProps}
        {...props}
        color={color}
        helperText={error ?? helperText}
      >
        {placeholderOption}
        {renderOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </Field>
  );
};
