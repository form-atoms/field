import { z } from "zod";

import {
  ValidatedFieldAtom,
  ValidatedFieldAtomConfig,
  validatedFieldAtom,
} from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type BooleanFieldValue = boolean | undefined;

export type BooleanFieldAtom = ValidatedFieldAtom<BooleanFieldValue>;

export const booleanField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ValidatedFieldAtomConfig<BooleanFieldValue>> & ZodParams = {}) =>
  validatedFieldAtom({
    value: undefined,
    schema: z.boolean({ required_error }),
    ...config,
  });
