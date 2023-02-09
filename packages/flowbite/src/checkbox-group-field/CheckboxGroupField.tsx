import { Label, Checkbox, HelperText } from "flowbite-react";
import {
  MultiSelectFieldProps,
  useMultiSelectFieldProps,
  useMultiSelectOptions,
} from "@form-atoms/field";
import { useFieldError } from "../hooks";
import { Field } from "../field";

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
