import { TextInput, Label, TextInputProps } from "flowbite-react";
import { useInputField } from "form-atoms";
import { useFieldError } from "../hooks";
import { TextFieldProps } from "@react-last-field/field";

export const TextField = ({
  label,
  field,
  helperText,
  ...uiProps
}: TextFieldProps & TextInputProps) => {
  const { props } = useInputField(field);
  const { color, error } = useFieldError(field);

  return (
    <div className="flex flex-col gap-4">
      <Label color={color}>{label}</Label>
      <div>
        <TextInput
          color={color}
          {...props}
          helperText={color ? error : helperText}
          {...uiProps}
        />
      </div>
    </div>
  );
};
