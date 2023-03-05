import { ChangeEvent } from "react";

import { BooleanField } from "./booleanField";
import { FieldProps, useFieldProps } from "../../hooks";

export type NumberFieldProps = FieldProps<BooleanField>;

const valueAsBoolean = (event: ChangeEvent<HTMLInputElement>) => {
  const value = JSON.parse(event.currentTarget.value);

  return typeof value === "boolean" ? value : undefined;
};

export const useBooleanFieldProps = (field: BooleanField) =>
  useFieldProps(field, valueAsBoolean);
