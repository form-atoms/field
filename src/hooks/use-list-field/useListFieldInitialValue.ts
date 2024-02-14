import { FieldAtom, RESET, UseAtomOptions } from "form-atoms";

import { _useFieldInitialValue } from "../../atoms";
import { useHydrateField } from "../use-hydrate-field";

export function useListFieldInitialValue<Value>(
  fieldAtom: FieldAtom<Value>,
  initialValue?: Value | typeof RESET,
  options?: UseAtomOptions,
): void {
  useHydrateField(fieldAtom, initialValue);
  _useFieldInitialValue(fieldAtom, initialValue, options);
}
