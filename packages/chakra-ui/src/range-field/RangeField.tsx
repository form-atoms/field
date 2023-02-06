import { NumberFieldProps, useNumberFieldProps } from "@react-last-field/field";
import { useFieldActions } from "form-atoms";
import { ChakraField } from "../chakra-field";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderProps,
} from "@chakra-ui/react";

export const RangeField = ({
  field,
  label,
  ...sliderProps
}: NumberFieldProps & SliderProps) => {
  const props = useNumberFieldProps(field);
  const actions = useFieldActions(field);

  return (
    <ChakraField field={field} label={label}>
      <Slider
        name={props.name}
        value={props.value}
        onChange={actions.setValue}
        {...sliderProps}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </ChakraField>
  );
};
