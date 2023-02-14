import { TextFieldProps, useTextFieldProps } from "@form-atoms/field";
import { Label, TextInput, TextInputProps } from "flowbite-react";

import { Field } from "../field";
import { InputColors, useFieldError } from "../hooks";

type FlowbiteTextFieldProps = TextFieldProps &
  TextInputProps & { colors?: InputColors };

export const TextField = ({
  label,
  field,
  helperText,
  colors,
  ...uiProps
}: FlowbiteTextFieldProps) => {
  const props = useTextFieldProps(field);
  const { color, error } = useFieldError(field, colors);

  return (
    <Field>
      <Label color={color} htmlFor={props.id}>
        {label}
      </Label>
      <TextInput
        role="textbox"
        type="text"
        color={color}
        {...props}
        value={props.value ?? ""}
        helperText={error ?? helperText}
        {...uiProps}
      />
    </Field>
  );
};
