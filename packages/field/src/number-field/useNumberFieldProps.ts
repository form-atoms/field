import { ChangeEvent } from "react";
import { FieldProps, useFieldProps } from "../field";
import { NumberFieldAtom } from "./numberField";

export type NumberFieldProps = FieldProps<NumberFieldAtom>;

const getNumber = (event: ChangeEvent<HTMLInputElement>) => {
  const { valueAsNumber } = event.currentTarget;

  // empty input "" is read as NaN
  return Number.isNaN(valueAsNumber) ? undefined : valueAsNumber;
};

export const useNumberFieldProps = (field: NumberFieldAtom) =>
  useFieldProps(field, getNumber);
