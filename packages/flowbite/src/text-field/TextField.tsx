import { TextInput, Label, TextInputProps } from "flowbite-react";
import { useInputField } from "form-atoms";
import { useFieldError } from "../hooks";
import { TextFieldProps } from "@react-last-field/field";
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
  const { props } = useInputField(field);
  const { color, error } = useFieldError(field, colors);

  return (
    <Field>
      <Label color={color} htmlFor={props.name}>
        {label}
      </Label>
      <TextInput
        role="textbox"
        type="text"
        id={props.name}
        color={color}
        {...props}
        helperText={error ?? helperText}
        {...uiProps}
      />
    </Field>
  );
};
