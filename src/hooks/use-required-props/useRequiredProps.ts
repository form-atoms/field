import { useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";

import { ZodField } from "../../fields/zodField";

export type RequiredProps = {
  required: boolean;
  "aria-required": boolean;
};

export const useRequiredProps = ({
  field,
  required: manualRequired,
}: {
  field: ZodField<any>;
  required?: boolean;
}) => {
  const atom = useAtomValue(field);
  const isFieldRequired = useAtomValue(atom.required);

  // when field is required, prefer the manualRequired
  const required = isFieldRequired && (manualRequired ?? true);

  return useMemo(
    () => ({
      required,
      "aria-required": required,
    }),
    [required]
  );
};

export const useRequiredActions = (fieldAtom: ZodField<any>) => {
  const field = useAtomValue(fieldAtom);
  const setRequired = useSetAtom(field.required);

  return useMemo(
    () => ({
      setRequired,
    }),
    [setRequired]
  );
};
