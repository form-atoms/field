import { HelperText, Label, Radio } from "flowbite-react";
import {
  SelectFieldProps,
  useSelectFieldProps,
  useSelectOptions,
} from "@form-atoms/field";
import { useFieldError } from "../hooks";
import { Field } from "../field";
import { useInputFieldProps } from "form-atoms";

export const RadioField = <Option,>({
  field,
  options,
  getValue,
  getLabel,
  label,
  helperText,
}: SelectFieldProps<Option>) => {
  const props = useInputFieldProps(field);
  const { renderOptions } = useSelectOptions(field, {
    getValue,
    getLabel,
    options,
  });
  const { color, error } = useFieldError(field);

  const helpText = error ?? helperText;

  return (
    <Field>
      {label && <Label color={color}>{label}</Label>}
      {renderOptions.map(({ value, label, isActive }) => (
        <div className="flex items-center gap-2" key={value}>
          <Radio
            {...props}
            aria-checked={isActive}
            role="radio"
            id={value}
            value={value}
            checked={isActive}
          />
          <Label htmlFor={value}>{label}</Label>
        </div>
      ))}
      {helpText && <HelperText color={color}>{helpText}</HelperText>}
    </Field>
  );
};
