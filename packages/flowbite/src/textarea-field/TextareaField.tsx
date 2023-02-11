import { Label, Textarea, TextareaProps } from "flowbite-react";
import { useFieldError } from "../hooks";
import { TextFieldProps, useTextFieldProps } from "@form-atoms/field";
import { InputColors } from "../hooks";
import { Field } from "../field";

type FlowbiteTextFieldProps = TextFieldProps &
  TextareaProps & { colors?: InputColors };

export const TextareaField = ({
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
      <Textarea
        role="textbox"
        color={color}
        {...props}
        value={props.value ?? ""}
        helperText={error ?? helperText}
        {...uiProps}
      />
    </Field>
  );
};
