import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { FieldProps } from "@react-last-field/field";
import { FieldAtom, useFieldState } from "form-atoms";
import type { PropsWithChildren, ReactNode } from "react";

export type ChakraFieldProps = {
  label?: string;
  helperText?: ReactNode;
};

export const ChakraField = <Field extends FieldAtom<any>>({
  field,
  label,
  helperText,
  children,
}: PropsWithChildren<FieldProps<Field> & ChakraFieldProps>) => {
  const { validateStatus, errors } = useFieldState(field);

  const isInvalid = validateStatus === "invalid";

  return (
    <FormControl label={label} isInvalid={isInvalid}>
      {label && <FormLabel>{label}</FormLabel>}
      {children}
      <FormErrorMessage>{errors[0]}</FormErrorMessage>
      {!isInvalid && helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
