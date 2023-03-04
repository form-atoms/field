import { ChangeEvent } from "react";

import { StringArrayField, StringArrayFieldValue } from "./stringArrayField";
import { FieldProps, OptionProps, useFieldProps } from "../../hooks";

const getEventValue = (event: ChangeEvent<HTMLInputElement>, value: string[]) =>
  event.target.checked
    ? [...value, event.target.value]
    : value.filter((val) => val != event.target.value);

export type StringArrayFieldProps<Option> = FieldProps<StringArrayField> &
  OptionProps<Option, StringArrayFieldValue, string>;

export const useArrayFieldProps = (field: StringArrayField) =>
  useFieldProps<StringArrayField, HTMLInputElement>(field, getEventValue);
