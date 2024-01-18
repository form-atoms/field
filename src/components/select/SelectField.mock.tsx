import { FieldErrors, FieldLabel, Select, SelectProps } from "..";
import type { SelectField as _SelectField } from "../../hooks";

export const SelectField = <Option, Field extends _SelectField>({
  field,
  label,
  ...props
}: SelectProps<Option, Field>) => (
  <div style={{ margin: "20px 0" }}>
    <FieldLabel field={field} label={label} />
    <Select field={field} {...props} />
    <FieldErrors field={field} />
  </div>
);
