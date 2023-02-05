import { Input, InputProps } from "@chakra-ui/react";
import { ChakraField } from "../chakra-field";
import { FileFieldProps, useFileFieldProps } from "@react-last-field/field";

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
