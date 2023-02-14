import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from "@chakra-ui/react";
import { NumberFieldProps, useNumberFieldProps } from "@form-atoms/field";
import { useFieldActions } from "form-atoms";

import { ChakraField, ChakraFieldProps } from "../chakra-field";

export const NumberField = ({
  label,
  field,
  helperText,
  ...numberInputProps
}: NumberFieldProps & NumberInputProps & ChakraFieldProps) => {
  const { value, name, onChange } = useNumberFieldProps(field);

  const actions = useFieldActions(field);

  return (
    <ChakraField field={field} helperText={helperText} label={label}>
      <NumberInput
        value={value}
        onChange={(_, numVal) => actions.setValue(numVal)}
        name={name}
        {...numberInputProps}
      >
        <NumberInputField onChange={onChange} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </ChakraField>
  );
};
