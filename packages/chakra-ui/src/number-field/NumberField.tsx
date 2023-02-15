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
  field,
  required,
  label,
  helperText,
  ...numberInputProps
}: NumberFieldProps & NumberInputProps & ChakraFieldProps) => {
  const { value, name, onChange } = useNumberFieldProps(field);

  const actions = useFieldActions(field);

  return (
    <ChakraField
      field={field}
      required={required}
      label={label}
      helperText={helperText}
    >
      {(fieldProps) => (
        <NumberInput
          value={value}
          onChange={(_, numVal) => actions.setValue(numVal)}
          name={name}
          {...numberInputProps}
          {...fieldProps}
        >
          <NumberInputField onChange={onChange} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      )}
    </ChakraField>
  );
};
