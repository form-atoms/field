import {
  CheckboxFieldProps,
  useCheckboxFieldProps,
} from "@react-last-field/field";
import { Label, Checkbox, HelperText } from "flowbite-react";
import { useFieldError } from "../hooks";

export const CheckboxField = ({
  field,
  label,
  helperText,
}: CheckboxFieldProps) => {
  const { "aria-invalid": ariaInvalid, ...props } =
    useCheckboxFieldProps(field);

  const { color, error } = useFieldError(field);

  return (
    <div className="flex items-center gap-2">
      <Checkbox id={props.name} {...props} />
      <div className="flex flex-col">
        <Label color={color} htmlFor={props.name}>
          {label}
        </Label>
        {helperText && (
          <HelperText className="text-xs" color={color}>
            {error ?? helperText}
          </HelperText>
        )}
      </div>
    </div>
  );
};
