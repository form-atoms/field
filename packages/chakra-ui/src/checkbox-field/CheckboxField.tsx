import { CheckboxFieldProps, useCheckboxFieldProps } from "@form-atoms/field";
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

export const CheckboxField = ({
  field,
  ...uiProps
}: CheckboxFieldProps & CheckboxProps) => {
  const { "aria-invalid": ariaInvalid, ...props } =
    useCheckboxFieldProps(field);

  return (
    <FormControl isInvalid={ariaInvalid}>
      <Checkbox
        isInvalid={ariaInvalid}
        {...uiProps}
        checked={props.checked}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      <FormErrorMessage>Email is required.</FormErrorMessage>
      {!ariaInvalid && (
        <FormHelperText>
          Enter the email you'd like to receive the newsletter on.
        </FormHelperText>
      )}
    </FormControl>
  );
};
