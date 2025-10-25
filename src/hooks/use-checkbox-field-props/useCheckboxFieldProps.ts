import { UseFieldOptions } from "form-atoms";
import { ChangeEvent, useMemo } from "react";

import { FieldProps, useFieldProps } from "../";
import type {
  BooleanField,
  BooleanFieldValue,
  CheckboxField,
} from "../../fields";

export type CheckboxFieldProps = FieldProps<CheckboxField | BooleanField>;

const getChecked = (event: ChangeEvent<HTMLInputElement>) =>
  event.currentTarget.checked;

export function useCheckboxFieldProps(
  field: CheckboxField | BooleanField,
  options?: UseFieldOptions<BooleanFieldValue>,
) {
  // undefined (empty checkbox) is rendered as unchecked input
  const { value: checked = false, ...props } = useFieldProps<
    CheckboxField | BooleanField
  >(field, getChecked, options);

  return useMemo(
    () => ({
      type: "checkbox" as const,
      checked,
      role: "checkbox" as const,
      "aria-checked": checked,
      ...props,
    }),
    [checked, props],
  );
}
