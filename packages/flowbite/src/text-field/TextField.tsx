import { TextInput, Label, TextInputProps } from "flowbite-react";
import { useFieldError } from "../hooks";
import { TextFieldProps, useTextFieldProps } from "@form-atoms/field";
import { InputColors } from "../hooks";
import { Field } from "../field";

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
        helperText={error ?? helperText}
        {...uiProps}
      />
    </Field>
  );
};
