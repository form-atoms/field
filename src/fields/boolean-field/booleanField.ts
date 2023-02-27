import { z } from "zod";

import { ValidatedFieldAtomConfig, validatedFieldAtom } from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type BooleanFieldValue = boolean | undefined;

export const booleanField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ValidatedFieldAtomConfig<BooleanFieldValue>> & ZodParams) =>
  validatedFieldAtom({
    value: undefined,
    schema: z.boolean({ required_error }),
    ...config,
  });
