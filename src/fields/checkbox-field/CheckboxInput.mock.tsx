import { FieldLabel } from "../../components";
import {
  type CheckboxFieldProps,
  useCheckboxFieldProps,
  useRequiredProps,
} from "../../hooks";
import { PicoFieldErrors } from "../../scenarios/PicoFieldErrors";

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
        <PicoFieldErrors field={field} />
      </div>
    </div>
  );
};
