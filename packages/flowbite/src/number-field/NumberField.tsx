import { TextInput, Label, TextInputProps } from "flowbite-react";
import { useFieldError } from "../hooks";
import { NumberFieldProps } from "@react-last-field/field";
import { useNumberFieldProps } from "@react-last-field/field";

export const NumberField = ({
  label,
  field,
  helperText,
  ...inputProps
}: NumberFieldProps & TextInputProps) => {
  const props = useNumberFieldProps(field);
  const { color, error } = useFieldError(field);

  return (
    <div className="flex flex-col gap-4">
      {label && <Label color={color}>{label}</Label>}
      <div>
        <TextInput
          type="number"
          color={color}
          helperText={color ? error : helperText}
          {...inputProps}
          {...props}
        />
      </div>
    </div>
  );
};
