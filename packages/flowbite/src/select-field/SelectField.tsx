import {
  SelectFieldProps,
  useSelectFieldProps,
  useSelectOptions,
} from "@form-atoms/field";
import { Select, SelectProps } from "flowbite-react";

import { FlowbiteField } from "../field";

export const SelectField = <Option,>({
  field,
  options,
  getValue,
  getLabel,
  label,
  placeholder,
  helperText,
  required,
  ...uiProps
}: SelectFieldProps<Option> & SelectProps) => {
  const props = useSelectFieldProps(field);
  const { renderOptions, placeholderOption } = useSelectOptions(field, {
    getValue,
    getLabel,
    options,
    placeholder,
  });

  return (
    <FlowbiteField
      field={field}
      label={label}
      required={required}
      helperText={helperText}
    >
      {(fieldProps) => (
        <Select role="combobox" {...uiProps} {...props} {...fieldProps}>
          {placeholderOption}
          {renderOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      )}
    </FlowbiteField>
  );
};
