import { RangeSlider, RangeSliderProps, Label } from "flowbite-react";
import { useFieldError } from "../hooks";
import { NumberFieldProps, useNumberFieldProps } from "@react-last-field/field";

export const RangeField = ({
  label,
  field,
  helperText,
  ...inputProps
}: NumberFieldProps & RangeSliderProps) => {
  const props = useNumberFieldProps(field);
  const { color, error } = useFieldError(field);

  return (
    <div className="flex flex-col gap-4">
      {label && (
        <Label color={color} htmlFor={props.name}>
          {label}
        </Label>
      )}
      <div>
        <RangeSlider color={color} {...props} {...inputProps} />
      </div>
    </div>
  );
};
