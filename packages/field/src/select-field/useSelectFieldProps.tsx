import { ChangeEvent } from "react";

import { SelectFieldAtom } from "./selectField";
import { useFieldProps } from "../field";

const getEventValue = (event: ChangeEvent<HTMLSelectElement>) =>
  event.target.value || undefined;

export const useSelectFieldProps = (field: SelectFieldAtom) =>
  useFieldProps<string | undefined, HTMLSelectElement>(field, getEventValue);
