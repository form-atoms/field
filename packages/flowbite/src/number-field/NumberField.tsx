import { NumberFieldProps, useNumberFieldProps } from "@form-atoms/field";
import { Label, TextInput, TextInputProps } from "flowbite-react";

import { Field } from "../field";
import { useFieldError } from "../hooks";

export const NumberField = ({
  label,
  field,
  helperText,
  ...inputProps
}: NumberFieldProps & TextInputProps) => {
  const props = useNumberFieldProps(field);
  const { color, error } = useFieldError(field);

  return (
    <Field>
      {label && (
        <Label color={color} htmlFor={props.id}>
          {label} {props.required ? "(required)" : ""}
        </Label>
      )}
      <TextInput
        role="spinbutton"
        type="number"
        color={color}
        helperText={color ? error : helperText}
        {...inputProps}
        {...props}
        value={props.value ?? ""}
      />
    </Field>
  );
};
