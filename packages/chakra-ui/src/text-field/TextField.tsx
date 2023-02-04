import { Input, InputProps } from "@chakra-ui/react";
import { useInputField } from "form-atoms";
import type { FieldAtom } from "form-atoms";
import { ChakraFieldProps } from "../chakra-field";
import { ChakraField } from "../chakra-field";

export const TextField = ({
  field,
  label,
  helperText,
  ...uiProps
}: {
  field: FieldAtom<string>;
} & ChakraFieldProps &
  InputProps) => {
  const { props } = useInputField(field);

  return (
    <ChakraField field={field} label={label} helperText={helperText}>
      <Input {...props} {...uiProps} />
    </ChakraField>
  );
};
