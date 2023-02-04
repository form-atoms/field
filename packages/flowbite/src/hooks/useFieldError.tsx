import { FieldAtom, useFieldState } from "form-atoms";

export const useFieldError = <Value,>(field: FieldAtom<Value>) => {
  const { validateStatus, errors, touched } = useFieldState(field);
  const color = validateStatus === "invalid" && touched ? "failure" : undefined;

  return {
    color,
    error: errors[0],
    errors,
  };
};
