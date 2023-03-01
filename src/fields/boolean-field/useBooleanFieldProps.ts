import { ChangeEvent } from "react";

import { BooleanFieldAtom } from "./booleanField";
import { FieldProps, useFieldProps } from "../../hooks";

export type NumberFieldProps = FieldProps<BooleanFieldAtom>;

const valueAsBoolean = (event: ChangeEvent<HTMLInputElement>) => {
  const value = JSON.parse(event.currentTarget.value);

  return typeof value === "boolean" ? value : undefined;
};

export const useBooleanFieldProps = (field: BooleanFieldAtom) =>
  useFieldProps(field, valueAsBoolean);
