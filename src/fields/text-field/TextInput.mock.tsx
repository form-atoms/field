import { ComponentProps } from "react";

import { FieldErrors, FieldLabel } from "../../components";
import { TextFieldProps, useTextFieldProps } from "../../hooks";

export const TextInput = ({
  field,
  label,
  initialValue,
  ...inputProps
}: TextFieldProps & ComponentProps<"input">) => {
  const props = useTextFieldProps(field, { initialValue });

  return (
    <p>
      <FieldLabel field={field} label={label} />
      <input {...inputProps} {...props} />
      <FieldErrors field={field} />
    </p>
  );
};
