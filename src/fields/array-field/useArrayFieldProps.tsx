import { ChangeEvent } from "react";

import { StringArrayField, StringArrayFieldValue } from "./stringArrayField";
import { FieldProps, OptionProps, useFieldProps } from "../../hooks";

// TODO: make not dependent on checkbox input event
const getEventValue = (event: ChangeEvent<HTMLInputElement>, value: string[]) =>
  event.target.checked
    ? [...value, event.target.value]
    : value.filter((val) => val != event.target.value);

export type StringArrayFieldProps<Option> = FieldProps<StringArrayField> &
  OptionProps<Option, string, StringArrayFieldValue>;

export const useArrayFieldProps = (field: StringArrayField) =>
  useFieldProps<string[], HTMLInputElement>(field, getEventValue);
