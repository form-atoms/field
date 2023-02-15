import { NumberFieldProps, useNumberFieldProps } from "@form-atoms/field";
import { TextInput, TextInputProps } from "flowbite-react";

import { FlowbiteField } from "../field";

export const NumberField = ({
  label,
  field,
  helperText,
  required,
  ...inputProps
}: NumberFieldProps & TextInputProps) => {
  const props = useNumberFieldProps(field);

  return (
    <FlowbiteField
      field={field}
      label={label}
      required={required}
      helperText={helperText}
    >
      {(fieldProps) => (
        <TextInput
          role="spinbutton"
          type="number"
          {...inputProps}
          {...props}
          value={props.value ?? ""}
          {...fieldProps}
        />
      )}
    </FlowbiteField>
  );
};
