import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { FieldProps } from "@form-atoms/field";
import { FieldAtom, useFieldState } from "form-atoms";
import type { PropsWithChildren, ReactNode } from "react";

export type ChakraFieldProps = {
  label?: ReactNode;
  helperText?: ReactNode;
};

export const ChakraField = <Field extends FieldAtom<any>>({
  field,
  label,
  helperText,
  children,
}: PropsWithChildren<FieldProps<Field> & ChakraFieldProps>) => {
  // TODO: Improve typing
  const { validateStatus, errors } = useFieldState(field);

  const isInvalid = validateStatus === "invalid";

  // TODO: Label should have type string
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
