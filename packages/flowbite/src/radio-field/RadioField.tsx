import { Label, Radio } from "flowbite-react";
import { SelectFieldProps, useSelectOptions } from "@react-last-field/field";
import { useFieldError } from "../hooks";
import { useInputFieldProps } from "form-atoms";

export const RadioField = <Option,>({
  field,
  options,
  getValue,
  getLabel,
  label,
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
      {renderOptions.map(({ value, label, isActive }) => (
        <div className="flex items-center gap-2" key={value}>
          <Radio {...props} id={value} value={value} checked={isActive} />
          <Label htmlFor={value}>{label}</Label>
        </div>
      ))}
    </div>
  );
};
