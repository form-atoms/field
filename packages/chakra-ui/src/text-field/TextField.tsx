import { Input, InputProps } from "@chakra-ui/react";
import { TextFieldProps, useTextFieldProps } from "@form-atoms/field";

import { ChakraField, ChakraFieldProps } from "../chakra-field";

export const TextField = ({
  field,
  required,
  label,
  helperText,
  ...uiProps
}: TextFieldProps & ChakraFieldProps & InputProps) => {
  const props = useTextFieldProps(field);

  return (
    <ChakraField
      field={field}
      required={required}
      label={label}
      helperText={helperText}
    >
      {(fieldProps) => <Input {...props} {...uiProps} {...fieldProps} />}
    </ChakraField>
  );
};
