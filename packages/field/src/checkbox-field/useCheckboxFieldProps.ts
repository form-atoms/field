import { FieldAtom } from "form-atoms";
import { ChangeEvent, useMemo } from "react";
import { LastFieldProps, useLastFieldProps } from "../last-field";

export type CheckboxValue = boolean;

export type CheckboxFieldAtom = FieldAtom<CheckboxValue>;

export type CheckboxFieldProps = LastFieldProps<CheckboxFieldAtom>;

const getChecked = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.checked;

export function useCheckboxFieldProps(field: CheckboxFieldAtom) {
  const { value: checked, ...props } = useLastFieldProps(field, getChecked);

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
