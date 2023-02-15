import {
  Slider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { NumberFieldProps, useNumberFieldProps } from "@form-atoms/field";
import { useFieldActions, useFieldInitialValue } from "form-atoms";

import { ChakraField } from "../chakra-field";

export const RangeField = ({
  field,
  label,
  required,
  helperText,
  defaultValue,
  ...sliderProps
}: NumberFieldProps & SliderProps) => {
  const props = useNumberFieldProps(field);
  const actions = useFieldActions(field);

  useFieldInitialValue(field, defaultValue);

  return (
    <ChakraField
      field={field}
      label={label}
      required={required}
      helperText={helperText}
    >
      {({ id }) => (
        <Slider
          name={props.name}
          value={props.value}
          onChange={actions.setValue}
          {...sliderProps}
          id={id}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      )}
    </ChakraField>
  );
};
