import { TextInput, Label, TextInputProps } from "flowbite-react";
import { useInputField } from "form-atoms";
import { useFieldError } from "../hooks";
import { TextFieldProps } from "@react-last-field/field";
import { InputColors } from "../hooks";

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
    <div className="flex flex-col gap-4">
      <Label color={color}>{label}</Label>
      <div>
        <TextInput
          color={color}
          {...props}
          helperText={error ?? helperText}
          {...uiProps}
        />
      </div>
    </div>
  );
};
