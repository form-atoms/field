import type { FieldAtom } from "form-atoms";
import type { ReactNode } from "react";

export type LastFieldProps<Field extends FieldAtom<any>> = {
  field: Field;
  label?: ReactNode;
  helperText?: ReactNode;
};
