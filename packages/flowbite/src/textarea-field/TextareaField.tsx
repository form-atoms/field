import { TextFieldProps, useTextFieldProps } from "@form-atoms/field";
import { Label, Textarea, TextareaProps } from "flowbite-react";

import { Field } from "../field";
import { InputColors, useFieldError } from "../hooks";

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
