import { FieldAtom, RESET, UseFieldInitialValueOptions } from "form-atoms";

import { _useFieldInitialValue } from "../../atoms";
import { useHydrateField } from "../use-hydrate-field";

export function useListFieldInitialValue<Value>(
  fieldAtom: FieldAtom<Value>,
  initialValue?: Value | typeof RESET,
  options?: UseFieldInitialValueOptions<Value>,
): void {
  useHydrateField(fieldAtom, initialValue);
  _useFieldInitialValue(fieldAtom, initialValue, options);
}
