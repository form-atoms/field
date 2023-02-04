import { TextInput, Label, TextInputProps } from "flowbite-react";
import { useInputField } from "form-atoms";
import { useFieldError } from "../hooks";
import { NumberFieldProps } from "@react-last-field/field";

export const NumberField = ({
  label,
  field,
  helperText,
  ...inputProps
}: NumberFieldProps & TextInputProps) => {
  const { props, actions } = useInputField(field);
  const { color, error } = useFieldError(field);

  return (
    <div className="flex flex-col gap-4">
      {label && <Label color={color}>{label}</Label>}
      <div>
        <TextInput
          type="number"
          color={color}
          {...props}
          helperText={color ? error : helperText}
          {...inputProps}
          onChange={(event) => {
            actions.setValue(parseFloat(event.target.value));
          }}
        />
      </div>
    </div>
  );
};
