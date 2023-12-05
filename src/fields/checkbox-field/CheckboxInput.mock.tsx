import { ReactNode } from "react";

import { CheckboxField } from "./checkboxField";
import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";
import { useCheckboxFieldProps, useRequiredProps } from "../../hooks";
import { BooleanField } from "../boolean-field";

export const CheckboxInput = ({
  field,
  label,
  required,
}: {
  field: BooleanField | CheckboxField;
  label: ReactNode;
  required?: boolean;
}) => {
  const props = useCheckboxFieldProps(field);
  const requiredProps = useRequiredProps({ field, required });

  return (
    <div style={{ margin: "20px 0" }}>
      <input type="checkbox" {...props} {...requiredProps} />
      <FieldLabel field={field} label={label} />
      <div>
        <FieldErrors field={field} />
      </div>
    </div>
  );
};
