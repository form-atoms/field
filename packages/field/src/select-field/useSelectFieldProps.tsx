import { ChangeEvent } from "react";
import { useLastFieldProps } from "../last-field";
import { SelectFieldAtom } from "./selectField";

const getEventValue = (event: ChangeEvent<HTMLSelectElement>) =>
  event.target.value || undefined;

export const useSelectFieldProps = (field: SelectFieldAtom) =>
  useLastFieldProps<string | undefined, HTMLSelectElement>(
    field,
    getEventValue
  );
