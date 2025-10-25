import { ComponentProps } from "react";

import { FieldLabel } from "../../components";
import { NumberFieldProps, useNumberFieldProps } from "../../hooks";
import { PicoFieldErrors } from "../../scenarios/PicoFieldErrors";

export const NumberInput = ({
  field,
  label,
  initialValue,
  ...inputProps
}: NumberFieldProps & ComponentProps<"input">) => {
  const props = useNumberFieldProps(field, { initialValue });

  return (
    <div style={{ margin: "20px 0" }}>
      <FieldLabel field={field} label={label} />
      <input {...inputProps} {...props} />
      <PicoFieldErrors field={field} />
    </div>
  );
};
