import { ChangeEvent, useMemo } from "react";

import { CheckboxField } from "./checkboxField";
import { FieldProps, useFieldProps } from "../../hooks";
import { BooleanField } from "../boolean-field";

export type CheckboxFieldProps = FieldProps<BooleanField>;

const getChecked = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.checked;

export function useCheckboxFieldProps(field: BooleanField | CheckboxField) {
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
