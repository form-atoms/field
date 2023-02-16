import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import {
  CheckboxFieldProps,
  useCheckboxFieldProps,
  useRequiredProps,
} from "@form-atoms/field";

import { useFieldError } from "../hooks";

export const CheckboxField = ({
  field,
  required,
  helperText,
  ...uiProps
}: CheckboxFieldProps & CheckboxProps) => {
  // BUG: ref causes infinite renders
  const {
    "aria-invalid": _,
    ref,
    checked,
    ...props
  } = useCheckboxFieldProps(field);
  const { isInvalid, error } = useFieldError(field);
  const { isFieldRequired, ...requiredProps } = useRequiredProps(
    field,
    required
  );

  return (
    <FormControl isInvalid={isInvalid} isRequired={isFieldRequired}>
      <Checkbox
        {...uiProps}
        {...props}
        {...requiredProps}
        isChecked={checked}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
      {!isInvalid && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
