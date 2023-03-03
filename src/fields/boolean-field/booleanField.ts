import { ExtractAtomValue } from "jotai";
import { ZodBoolean, z } from "zod";

import { ValidatedFieldAtomConfig, validatedFieldAtom } from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type BooleanFieldAtom = ReturnType<typeof booleanField>;

export type BooleanFieldValue = ExtractAtomValue<
  ExtractAtomValue<BooleanFieldAtom>["value"]
>;

export const booleanField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ValidatedFieldAtomConfig<ZodBoolean>> & ZodParams = {}) =>
  validatedFieldAtom({
    value: undefined,
    schema: z.boolean({ required_error }),
    ...config,
  });
