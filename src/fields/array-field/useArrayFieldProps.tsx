import { ChangeEvent } from "react";

import { StringArrayField, StringArrayFieldValue } from "./stringArrayField";
import { FieldProps, UseOptionProps, useFieldProps } from "../../hooks";

const getEventValue = (event: ChangeEvent<HTMLInputElement>, value: string[]) =>
  event.target.checked
    ? [...value, event.target.value]
    : value.filter((val) => val != event.target.value);

export type StringArrayFieldProps<Option> = FieldProps<StringArrayField> &
  UseOptionProps<Option, StringArrayFieldValue, string>;

export const useArrayFieldProps = (field: StringArrayField) =>
  useFieldProps<StringArrayField, HTMLInputElement>(field, getEventValue);
