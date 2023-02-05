import { FieldAtom } from "form-atoms";
import { ChangeEvent, useMemo } from "react";
import { LastFieldProps, useLastFieldProps } from "../last-field";

export type NumberFieldAtom = FieldAtom<number>;

export type NumberFieldProps = LastFieldProps<NumberFieldAtom>;

const getNumber = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.valueAsNumber;

export function useNumberFieldProps(field: NumberFieldAtom) {
  const props = useLastFieldProps(field, getNumber);

  return useMemo(() => props, [props]);
}
