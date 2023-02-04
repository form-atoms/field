import { useFieldActions } from "form-atoms";
import { NumberFieldProps, useNumberField } from "@react-last-field/field";
import {
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  NumberInputProps,
} from "@chakra-ui/react";
import { ChakraField, ChakraFieldProps } from "../chakra-field";

export const NumberField = ({
  label,
  field,
  helperText,
  ...numberInputProps
}: NumberFieldProps & NumberInputProps & ChakraFieldProps) => {
  const { value, name, onChange } = useNumberField(field);

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
