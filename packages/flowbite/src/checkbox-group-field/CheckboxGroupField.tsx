import {
  MultiSelectFieldProps,
  useMultiSelectFieldProps,
  useMultiSelectOptions,
} from "@form-atoms/field";
import { Checkbox, HelperText, Label } from "flowbite-react";

import { FlowbiteField } from "../field";

export const CheckboxGroupField = <Option,>({
  field,
  options,
  getValue,
  getLabel,
  label,
  required,
  placeholder,
  helperText,
  ...uiProps
}: MultiSelectFieldProps<Option>) => {
  const props = useMultiSelectFieldProps(field);
  const { renderOptions } = useMultiSelectOptions(field, {
    getValue,
    getLabel,
    options,
    placeholder,
  });

  return (
    <FlowbiteField
      field={field}
      required={required}
      helperText={helperText}
      label={label}
    >
      {({ color, helperText, required: isInputRequired, ...fieldProps }) => {
        // maybe move into multiSelectOptions?
        const required = props.value.length === 0 ? isInputRequired : false;

        return (
          <>
            {renderOptions.map(({ value, label, isActive }) => (
              <div key={value} className="flex gap-2">
                <Checkbox
                  role="checkbox"
                  {...props}
                  {...uiProps}
                  {...fieldProps}
                  required={required}
                  aria-required={required}
                  id={value}
                  checked={isActive}
                  value={value}
                />
                <Label htmlFor={value}>{label}</Label>
              </div>
            ))}
            {helperText && <HelperText color={color}>{helperText}</HelperText>}
          </>
        );
      }}
    </FlowbiteField>
  );
};
