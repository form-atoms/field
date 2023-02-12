import { Input, InputProps } from "@chakra-ui/react";
import { FileFieldProps, useFileFieldProps } from "@form-atoms/field";

import { ChakraField } from "../chakra-field";

export const FileField = ({
  field,
  label,
  helperText,
  ...uiProps
}: FileFieldProps & InputProps) => {
  const { value, ...props } = useFileFieldProps(field);

  return (
    <ChakraField field={field} label={label} helperText={helperText}>
      <Input type="file" {...props} {...uiProps} />
    </ChakraField>
  );
};
