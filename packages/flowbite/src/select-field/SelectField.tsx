import { Label, Select } from "flowbite-react";
import { SelectFieldProps, useSelectOptions } from "@react-last-field/field";
import { useFieldError } from "../hooks";
import { useInputFieldProps } from "form-atoms";

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
    <div className="flex flex-col gap-4">
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
    </div>
  );
};
