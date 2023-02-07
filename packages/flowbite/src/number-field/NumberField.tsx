import { TextInput, Label, TextInputProps } from "flowbite-react";
import { useFieldError } from "../hooks";
import { NumberFieldProps } from "@form-atoms/field";
import { useNumberFieldProps } from "@form-atoms/field";
import { Field } from "../field";

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
          {label}
        </Label>
      )}
      <TextInput
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
