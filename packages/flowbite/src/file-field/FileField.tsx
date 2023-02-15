import {
  FileFieldProps,
  useClearFileFieldEffect,
  useFileFieldProps,
} from "@form-atoms/field";
import { FileInput, FileInputProps } from "flowbite-react";

import { FlowbiteField } from "../field";
import { InputColors } from "../hooks";

type FlowbiteFileFieldProps = FileFieldProps &
  FileInputProps & { colors?: InputColors };

export const FileField = ({
  label,
  field,
  helperText,
  colors,
  required,
  ...uiProps
}: FlowbiteFileFieldProps) => {
  const { value, ...props } = useFileFieldProps(field);
  useClearFileFieldEffect(field);

  return (
    <FlowbiteField
      field={field}
      required={required}
      helperText={helperText}
      label={label}
    >
      {(fieldProps) => (
        <FileInput role="dialog" {...props} {...uiProps} {...fieldProps} />
      )}
    </FlowbiteField>
  );
};
