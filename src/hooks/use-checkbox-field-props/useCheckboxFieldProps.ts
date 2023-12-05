import { ChangeEvent, useMemo } from "react";

import { FieldProps, useFieldProps } from "../";
import { BooleanField, type CheckboxField } from "../../fields";

export type CheckboxFieldProps = FieldProps<CheckboxField | BooleanField>;

const getChecked = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.checked;

export function useCheckboxFieldProps(field: CheckboxField | BooleanField) {
  // undefined (empty checkbox) is rendered as unchecked input
  const { value: checked = false, ...props } = useFieldProps<
    CheckboxField | BooleanField
  >(field, getChecked);

  return useMemo(
    () => ({
      checked,
      role: "checkbox",
      "aria-checked": checked,
      ...props,
    }),
    [checked, props],
  );
}
