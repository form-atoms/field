import {
  FileFieldProps,
  useClearInputAction,
  useFileFieldProps,
} from "@form-atoms/field";
import { FileInput, FileInputProps, Label } from "flowbite-react";
import { useEffect } from "react";

import { Field } from "../field";
import { InputColors, useFieldError } from "../hooks";

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
  const { clear } = useClearInputAction(field);

  useEffect(() => {
    // TODO: skip on initial render
    if (value === undefined) {
      console.log({ value }, "reseting");
      clear();
    }
  }, [value]);

  return (
    <Field>
      <Label color={color} htmlFor={props.id}>
        {label}
      </Label>
      <FileInput
        role="dialog"
        color={color}
        {...props}
        helperText={error ?? helperText}
        {...uiProps}
      />
    </Field>
  );
};
