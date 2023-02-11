import { ChangeEvent } from "react";
import { useFieldProps } from "../field";
import { MultiSelectFieldAtom } from "./multiSelectField";

// TODO: make not dependent on checkbox input event
const getEventValue = (event: ChangeEvent<HTMLInputElement>, value: string[]) =>
  event.target.checked
    ? [...value, event.target.value]
    : value.filter((val) => val != event.target.value);

export const useMultiSelectFieldProps = (field: MultiSelectFieldAtom) =>
  useFieldProps<string[], HTMLInputElement>(field, getEventValue);
