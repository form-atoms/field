import { useAtomValue } from "jotai";
import { useMemo } from "react";

import { ValidatedFieldAtom } from "./field";

export type RequiredProps = {
  required: boolean;
  "aria-required": boolean;
  isFieldRequired: boolean;
};

export const useRequiredProps = <Value>(
  fieldAtom: ValidatedFieldAtom<Value>,
  uiRequired?: boolean
) => {
  const field = useAtomValue(fieldAtom);
  const isFieldRequired = useAtomValue(field.required);

  // when data-required, prefer the uiProp
  const required = isFieldRequired && (uiRequired ?? true);

  return useMemo(
    () => ({
      isFieldRequired,
      required,
      "aria-required": required,
    }),
    [required, isFieldRequired]
  );
};
