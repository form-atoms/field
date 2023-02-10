import { TextInput, Label, TextInputProps } from "flowbite-react";
import { useFieldError } from "../hooks";
import { NumberFieldProps, useFieldRequiredProps } from "@form-atoms/field";
import { useNumberFieldProps } from "@form-atoms/field";
import { Field } from "../field";

export const ValidatedNumberField = ({
  label,
  field,
  helperText,
  ...inputProps
}: NumberFieldProps & TextInputProps) => {
  const props = useNumberFieldProps(field);
  const { color, error } = useFieldError(field);

  // @ts-ignore TODO: update prop types
  const requiredProps = useFieldRequiredProps(field);

  return (
    <Field>
      {label && (
        <Label color={color} htmlFor={props.id}>
          {label} {requiredProps.required ? "(required)" : ""}
        </Label>
      )}
      <TextInput
        {...requiredProps}
        role="spinbutton"
        type="number"
        color={color}
        helperText={color ? error : helperText}
        {...inputProps}
        {...props}
      />
    </Field>
  );
};
