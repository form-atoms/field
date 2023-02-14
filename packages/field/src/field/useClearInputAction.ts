import { FieldAtom, UseAtomOptions } from "form-atoms";
import { useAtomValue } from "jotai";
import { useMemo } from "react";

export const useClearInputAction = (
  fieldAtom: FieldAtom<unknown>,
  options?: UseAtomOptions
) => {
  const field = useAtomValue(fieldAtom, options);
  const ref = useAtomValue(field.ref, options);

  return useMemo(
    () => ({
      clear() {
        if (ref) {
          ref.value = "";
        }
      },
    }),
    [ref]
  );
};
