import { ReactNode } from "react";

import { CheckboxField } from "./checkboxField";
import { useCheckboxFieldProps } from "./useCheckboxFieldProps";
import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";
import { useRequiredProps } from "../../hooks";

export const CheckboxInput = ({
  field,
  label,
  required,
}: {
  field: CheckboxField;
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
