import { ChangeEvent } from "react";
import { FieldProps, useFieldProps } from "../field";
import { NumberFieldAtom } from "./numberField";

export type NumberFieldProps = FieldProps<NumberFieldAtom>;

const getNumber = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.valueAsNumber || undefined;

export const useNumberFieldProps = (field: NumberFieldAtom) =>
  useFieldProps(field, getNumber);
