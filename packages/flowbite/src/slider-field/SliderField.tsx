import { NumberFieldProps, useNumberFieldProps } from "@form-atoms/field";
import {
  HelperText,
  Label,
  RangeSlider,
  RangeSliderProps,
} from "flowbite-react";

import { Field } from "../field";
import { useFieldError } from "../hooks";

export const SliderField = ({
  label,
  field,
  helperText,
  ...inputProps
}: NumberFieldProps & RangeSliderProps) => {
  const props = useNumberFieldProps(field);
  const { color, error } = useFieldError(field);

  const help = error ?? helperText;

  return (
    <Field>
      {label && (
        <Label color={color} htmlFor={props.id}>
          {label}
        </Label>
      )}
      <RangeSlider color={color} {...props} {...inputProps} />
      {help && <HelperText color={color}>{help}</HelperText>}
    </Field>
  );
};
