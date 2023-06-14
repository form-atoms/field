import { ReactNode } from "react";

import { DateField } from "./dateField";
import { useDateFieldProps } from "./useDateFieldProps";
import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";

export const getDateString = (date: Date = new Date()) =>
  date.toISOString().slice(0, 10);

export const DateInput = ({
  field,
  label,
}: {
  field: DateField;
  label: ReactNode;
}) => {
  const { value, ...props } = useDateFieldProps(field);

  return (
    <div style={{ margin: "20px 0" }}>
      <FieldLabel field={field} label={label} />
      <input
        type="date"
        {...props}
        value={`${value ? getDateString(value) : ""}`}
      />
      <FieldErrors field={field} />
    </div>
  );
};
