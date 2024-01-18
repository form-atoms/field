import { FieldErrors, FieldLabel } from "../../components";
import { DateFieldProps, useDateFieldProps } from "../../hooks";

export const getDateString = (date: Date = new Date()) =>
  date.toISOString().slice(0, 10);

export const DateInput = ({ field, label, initialValue }: DateFieldProps) => {
  const { value, ...props } = useDateFieldProps(field, { initialValue });

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
