import { fieldAtom, FieldAtom, FieldAtomConfig } from "form-atoms";
import { ChangeEvent, useMemo } from "react";
import { LastFieldProps, useLastFieldProps } from "../last-field";
import { zodValidate } from "form-atoms/zod";
import { z } from "zod";

type NumberValue = number | undefined;

export type NumberFieldAtom = FieldAtom<NumberValue>;

type NumberConfig = Partial<FieldAtomConfig<NumberValue>>;

type NumberConfigBuilder = (zod: {
  zodValidate: typeof zodValidate;
  z: typeof z;
}) => NumberConfig;

export const numberField = (config?: NumberConfig | NumberConfigBuilder) =>
  fieldAtom({
    value: undefined,
    validate: zodValidate(
      z.number({ required_error: "This field is required" }),
      { on: "change" }
    ),
    ...(typeof config === "function" ? config({ zodValidate, z }) : config),
  });

const age = numberField(({ zodValidate, z }) => ({
  validate: zodValidate(z.number().min(1).max(10)),
}));

export type NumberFieldProps = LastFieldProps<NumberFieldAtom>;

const getNumber = (event: ChangeEvent<HTMLInputElement>) =>
  event.target.valueAsNumber;

export function useNumberFieldProps(field: NumberFieldAtom) {
  const props = useLastFieldProps(field, getNumber);

  return useMemo(() => props, [props]);
}
