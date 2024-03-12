import { ComponentProps } from "react";

import { FieldLabel } from "../../components";
import { TextFieldProps, useTextFieldProps } from "../../hooks";
import { PicoFieldErrors } from "../../scenarios/PicoFieldErrors";

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
      <PicoFieldErrors field={field} />
    </p>
  );
};
