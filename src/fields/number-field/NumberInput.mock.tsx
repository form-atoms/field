import { ComponentProps } from "react";

import { FieldErrors, FieldLabel } from "../../components";
import { NumberFieldProps, useNumberFieldProps } from "../../hooks";

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
      <input type="number" {...inputProps} {...props} />
      <FieldErrors field={field} />
    </div>
  );
};
