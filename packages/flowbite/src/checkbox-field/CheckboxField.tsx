import {
  CheckboxFieldProps,
  useCheckboxFieldProps,
} from "@react-last-field/field";
import { Label, Checkbox, HelperText, CheckboxProps } from "flowbite-react";
import { useFieldError } from "../hooks";

export const CheckboxField = ({
  field,
  label,
  helperText,
  ...uiProps
}: CheckboxFieldProps & CheckboxProps) => {
  const props = useCheckboxFieldProps(field);
  const { color, error } = useFieldError(field);

  const help = error ?? helperText;

  return (
    <div className="flex gap-2">
      {/** height must match line-height of the label */}
      <div className="flex h-5 items-center">
        <Checkbox id={props.name} {...props} {...uiProps} />
      </div>
      <div className="flex flex-col">
        <Label color={color} htmlFor={props.name}>
          {label}
        </Label>
        {help && (
          <HelperText className="mt-0 text-xs" color={color}>
            {help}
          </HelperText>
        )}
      </div>
    </div>
  );
};
