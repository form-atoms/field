import { ChangeEvent } from "react";

import { SelectFieldAtom } from "./selectField";
import { useFieldProps } from "..";

const getEventValue = (
  event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
) => event.target.value || undefined;

export const useSelectFieldProps = (field: SelectFieldAtom) =>
  useFieldProps<string | undefined, HTMLSelectElement | HTMLInputElement>(
    field,
    getEventValue
  );
