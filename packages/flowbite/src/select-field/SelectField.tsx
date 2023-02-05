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
  ...uiProps
}: SelectFieldProps<Option>) => {
  const props = useInputFieldProps(field);

  const { renderOptions } = useSelectOptions(field, {
    getValue,
    getLabel,
    options,
  });
  const { color } = useFieldError(field);

  return (
    <Field>
      {label && (
        <Label color={color} htmlFor={props.name}>
          {label}
        </Label>
      )}
      <Select {...uiProps} {...props}>
        {renderOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </Field>
  );
};
