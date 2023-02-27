import { z } from "zod";

import {
  ValidatedFieldAtom,
  ValidatedFieldAtomConfig,
  validatedFieldAtom,
} from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type NumberFieldValue = number | undefined;

export type NumberFieldAtom = ValidatedFieldAtom<NumberFieldValue>;

export const numberField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ValidatedFieldAtomConfig<NumberFieldValue>> & ZodParams = {}) =>
  validatedFieldAtom({
    value: undefined,
    schema: z.number({ required_error }),
    ...config,
  });
