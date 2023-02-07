import { fieldAtom, FieldAtom, FieldAtomConfig } from "form-atoms";
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
