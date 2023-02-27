import { z } from "zod";

import {
  ValidatedFieldAtom,
  ValidatedFieldAtomConfig,
  validatedFieldAtom,
} from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type SelectFieldAtom<Value = string> = ValidatedFieldAtom<
  Value | undefined
>;

export const selectField = <Value = string>({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ValidatedFieldAtomConfig<Value | undefined>> & ZodParams = {}) =>
  validatedFieldAtom({
    value: undefined,
    schema: z.string({ required_error }),
    ...config,
  });
