import { Input, InputProps } from "@chakra-ui/react";
import { TextFieldProps, useTextFieldProps } from "@form-atoms/field";

import { ChakraField, ChakraFieldProps } from "../chakra-field";

export const TextField = ({
  field,
  label,
  helperText,
  ...uiProps
}: TextFieldProps & ChakraFieldProps & InputProps) => {
  const props = useTextFieldProps(field);

  return (
    <ChakraField field={field} label={label} helperText={helperText}>
      <Input {...props} {...uiProps} />
    </ChakraField>
  );
};
