import { ReactNode } from "react";

import { NumberField } from "./numberField";
import { useNumberFieldProps } from "./useNumberFieldProps";
import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";

export const NumberInput = ({
  field,
  label,
}: {
  field: NumberField;
  label: ReactNode;
}) => {
  const props = useNumberFieldProps(field);

  return (
    <div style={{ margin: "20px 0" }}>
      <FieldLabel field={field} label={label} />
      <input type="number" {...props} />
      <FieldErrors field={field} />
    </div>
  );
};
