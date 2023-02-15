import { TextFieldProps, useTextFieldProps } from "@form-atoms/field";
import { Textarea, TextareaProps } from "flowbite-react";

import { FlowbiteField } from "../field";
import { InputColors } from "../hooks";

type FlowbiteTextFieldProps = TextFieldProps &
  TextareaProps & { colors?: InputColors };

export const TextareaField = ({
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
        <Textarea
          role="textbox"
          {...props}
          value={props.value ?? ""}
          {...uiProps}
          {...fieldProps}
        />
      )}
    </FlowbiteField>
  );
};
