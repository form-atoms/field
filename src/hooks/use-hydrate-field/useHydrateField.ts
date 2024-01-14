import { FieldAtom, RESET, UseAtomOptions } from "form-atoms";
import { useAtomValue } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

export const useHydrateField = <Value>(
  fieldAtom: FieldAtom<Value>,
  initialValue?: Value | typeof RESET,
  options?: UseAtomOptions,
) => {
  const field = useAtomValue(fieldAtom);
  useHydrateAtoms(
    initialValue
      ? [
          [field.value, initialValue],
          [field._initialValue, initialValue],
        ]
      : [],
    options,
  );
};
