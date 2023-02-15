import { NumberFieldProps, useNumberFieldProps } from "@form-atoms/field";
import { HelperText, RangeSlider, RangeSliderProps } from "flowbite-react";

import { FlowbiteField } from "../field";

export const SliderField = ({
  field,
  label,
  required,
  helperText,
  ...inputProps
}: NumberFieldProps & RangeSliderProps) => {
  const props = useNumberFieldProps(field);

  return (
    <FlowbiteField
      field={field}
      required={required}
      label={label}
      helperText={helperText}
    >
      {(fieldProps) => (
        <>
          <RangeSlider {...props} {...inputProps} {...fieldProps} />
          {fieldProps.helperText && (
            <HelperText color={fieldProps.color}>
              {fieldProps.helperText}
            </HelperText>
          )}
        </>
      )}
    </FlowbiteField>
  );
};
