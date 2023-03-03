import { ExtractAtomValue } from "jotai";
import { ZodNumber, z } from "zod";

import { ValidatedFieldAtomConfig, validatedFieldAtom } from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type NumberFieldAtom = ReturnType<typeof numberField>;

export type NumberFieldValue = ExtractAtomValue<
  ExtractAtomValue<NumberFieldAtom>["value"]
>;

export const numberField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ValidatedFieldAtomConfig<ZodNumber>> & ZodParams = {}) =>
  validatedFieldAtom({
    value: undefined,
    schema: z.number({ required_error }),
    ...config,
  });
