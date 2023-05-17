import { ChangeEvent, useMemo } from "react";

import { CheckboxField } from "./checkboxField";
import { FieldProps, useFieldProps } from "../../hooks";

export type CheckboxFieldProps = FieldProps<CheckboxField>;

const getChecked = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.checked;

export function useCheckboxFieldProps(field: CheckboxField) {
  const { value: checked, ...props } = useFieldProps(field, getChecked);

  return useMemo(
    () => ({
      checked,
      role: "checkbox",
      "aria-checked": checked,
      ...props,
    }),
    [checked, props]
  );
}
