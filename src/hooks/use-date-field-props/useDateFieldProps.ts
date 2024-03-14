import { UseFieldOptions } from "form-atoms";
import { ChangeEvent } from "react";

import { FieldProps, useFieldProps } from "../";
import type { DateField, DateFieldValue } from "../../fields/";

export type DateFieldProps = FieldProps<DateField>;

const getDate = (event: ChangeEvent<HTMLInputElement>) => {
  const { valueAsDate } = event.currentTarget;

  // empty input "" is read as null, so we normalize to undefined
  return valueAsDate ?? undefined;
};

export const useDateFieldProps = (
  field: DateField,
  options?: UseFieldOptions<DateFieldValue>,
) => useFieldProps(field, getDate, options);
