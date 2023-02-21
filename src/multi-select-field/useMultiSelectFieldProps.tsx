import { ChangeEvent } from "react";

import { MultiSelectFieldAtom } from "./multiSelectField";
import { useFieldProps } from "../field";

// TODO: make not dependent on checkbox input event
const getEventValue = (event: ChangeEvent<HTMLInputElement>, value: string[]) =>
  event.target.checked
    ? [...value, event.target.value]
    : value.filter((val) => val != event.target.value);

export const useMultiSelectFieldProps = (field: MultiSelectFieldAtom) =>
  useFieldProps<string[], HTMLInputElement>(field, getEventValue);
