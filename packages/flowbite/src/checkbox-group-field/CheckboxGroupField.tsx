import {
  MultiSelectFieldProps,
  useMultiSelectFieldProps,
  useMultiSelectOptions,
} from "@form-atoms/field";
import { Checkbox, HelperText, Label } from "flowbite-react";

import { Field } from "../field";
import { useFieldError } from "../hooks";

export const CheckboxGroupField = <Option,>({
  field,
  options,
  getValue,
  getLabel,
  label,
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
  const { color, error } = useFieldError(field);

  // when data-required, prefer the uiProp
  const isRequired = props.required && (uiProps.required ?? true);

  const required = props.value.length === 0 ? isRequired : false;

  const helpText = helperText ?? error;

  return (
    <Field>
      {label && (
        <Label color={color} htmlFor={props.id}>
          {label}
        </Label>
      )}
      {renderOptions.map(({ value, label, isActive }) => (
        <div className="flex gap-2" key={value}>
          <Checkbox
            role="checkbox"
            {...props}
            {...uiProps}
            required={required}
            aria-required={required}
            id={value}
            checked={isActive}
            value={value}
          />{" "}
          <Label htmlFor={value}>{label}</Label>
        </div>
      ))}
      {helpText && <HelperText color={color}>{helpText}</HelperText>}
    </Field>
  );
};
