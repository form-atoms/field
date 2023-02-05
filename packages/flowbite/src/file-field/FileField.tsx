import { Label, FileInput, FileInputProps } from "flowbite-react";
import { useInputField } from "form-atoms";
import { useFieldError } from "../hooks";
import { FileFieldProps, useFileFieldProps } from "@react-last-field/field";
import { InputColors } from "../hooks";

type FlowbiteFileFieldProps = FileFieldProps &
  FileInputProps & { colors?: InputColors };

export const FileField = ({
  label,
  field,
  helperText,
  colors,
  ...uiProps
}: FlowbiteFileFieldProps) => {
  const { value, ...props } = useFileFieldProps(field);
  const { color, error } = useFieldError(field, colors);

  return (
    <div className="flex flex-col gap-4">
      <Label color={color}>{label}</Label>
      <div>
        <FileInput
          color={color}
          multiple
          {...props}
          helperText={error ?? helperText}
          {...uiProps}
        />
      </div>
    </div>
  );
};
