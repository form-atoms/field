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
  const props = useCheckboxFieldProps(field);

  const { color, error } = useFieldError(field);

  const help = error ?? helperText;

  return (
    <div className="flex items-center gap-2">
      <Checkbox id={props.name} {...props} />
      <div className="flex flex-col">
        <Label color={color} htmlFor={props.name}>
          {label}
        </Label>
        {help && (
          <HelperText className="text-xs" color={color}>
            {help}
          </HelperText>
        )}
      </div>
    </div>
  );
};
