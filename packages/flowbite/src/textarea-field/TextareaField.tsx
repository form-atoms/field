import { Label, TextInputProps, Textarea, TextareaProps } from "flowbite-react";
import { useInputField } from "form-atoms";
import { useFieldError } from "../hooks";
import { TextFieldProps } from "@react-last-field/field";
import { InputColors } from "../hooks";

type FlowbiteTextFieldProps = TextFieldProps &
  TextareaProps & { colors?: InputColors };

export const TextareaField = ({
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
        <Textarea
          color={color}
          {...props}
          helperText={error ?? helperText}
          {...uiProps}
        />
      </div>
    </div>
  );
};
