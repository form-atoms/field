import { ChangeEvent } from "react";
import { useFieldProps } from "../field";
import { SelectFieldAtom } from "./selectField";

const getEventValue = (event: ChangeEvent<HTMLSelectElement>) =>
  event.target.value || undefined;

export const useSelectFieldProps = (field: SelectFieldAtom) =>
  useFieldProps<string | undefined, HTMLSelectElement>(field, getEventValue);
