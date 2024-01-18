import { FieldErrors, FieldLabel } from "../../components";
import {
  type CheckboxFieldProps,
  useCheckboxFieldProps,
  useRequiredProps,
} from "../../hooks";

export const CheckboxInput = ({
  field,
  label,
  required,
  initialValue,
}: CheckboxFieldProps) => {
  const props = useCheckboxFieldProps(field, { initialValue });
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
