import { ReactNode } from "react";

import { CheckboxField } from "./checkboxField";
import { useCheckboxFieldProps } from "./useCheckboxFieldProps";
import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";
import { BooleanField } from "../boolean-field";

export const CheckboxInput = ({
  field,
  label,
}: {
  field: CheckboxField | BooleanField;
  label: ReactNode;
}) => {
  const props = useCheckboxFieldProps(field);

  return (
    <div style={{ margin: "20px 0" }}>
      <input type="checkbox" {...props} />
      <FieldLabel field={field} label={label} />
      <div>
        <FieldErrors field={field} />
      </div>
    </div>
  );
};
