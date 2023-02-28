import { ChangeEvent } from "react";

import { NumberFieldAtom } from "./numberField";
import { FieldProps, useFieldProps } from "../../hooks";

export type NumberFieldProps = FieldProps<NumberFieldAtom>;

const getNumber = (event: ChangeEvent<HTMLInputElement>) => {
  const { valueAsNumber } = event.currentTarget;

  // empty input "" is read as NaN
  return Number.isNaN(valueAsNumber) ? undefined : valueAsNumber;
};

export const useNumberFieldProps = (field: NumberFieldAtom) =>
  useFieldProps(field, getNumber);
