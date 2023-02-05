import { Label, Select } from "flowbite-react";
import { SelectFieldProps, useSelectOptions } from "@react-last-field/field";
import { useFieldError } from "../hooks";
import { useInputFieldProps } from "form-atoms";
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
  const props = useInputFieldProps(field);

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
        <Label color={color} htmlFor={props.name}>
          {label}
        </Label>
      )}
      <Select
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
