import { TextFieldProps, useTextFieldProps } from "@form-atoms/field";
import { Label, TextInput, TextInputProps } from "flowbite-react";

import { FlowbiteField } from "../field";
import { InputColors, useFieldError } from "../hooks";

type FlowbiteTextFieldProps = TextFieldProps &
  TextInputProps & { colors?: InputColors };

export const TextField = ({
  label,
  field,
  helperText,
  colors,
  required,
  ...uiProps
}: FlowbiteTextFieldProps) => {
  const props = useTextFieldProps(field);

  return (
    <FlowbiteField
      field={field}
      required={required}
      label={label}
      helperText={helperText}
    >
      {(fieldProps) => (
        <TextInput
          role="textbox"
          type="text"
          {...props}
          value={props.value ?? ""}
          {...uiProps}
          {...fieldProps}
        />
      )}
    </FlowbiteField>
  );
};
