import { ChangeEvent, useMemo } from "react";

import { CheckboxValue } from "./checkboxField";
import { FieldProps, ValidatedFieldAtom, useFieldProps } from "..";

export type CheckboxFieldAtom = ValidatedFieldAtom<CheckboxValue>;

export type CheckboxFieldProps = FieldProps<CheckboxFieldAtom>;

const getChecked = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.checked;

export function useCheckboxFieldProps(field: CheckboxFieldAtom) {
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
