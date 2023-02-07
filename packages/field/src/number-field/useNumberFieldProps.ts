import { ChangeEvent, useMemo } from "react";
import { LastFieldProps, useLastFieldProps } from "../last-field";
import { NumberFieldAtom } from "./numberField";

export type NumberFieldProps = LastFieldProps<NumberFieldAtom>;

const getNumber = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.valueAsNumber;

export const useNumberFieldProps = (field: NumberFieldAtom) =>
  useLastFieldProps(field, getNumber);
