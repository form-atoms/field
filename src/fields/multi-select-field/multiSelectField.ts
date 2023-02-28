import { z } from "zod";

import {
  ValidatedFieldAtom,
  ValidatedFieldAtomConfig,
  validatedFieldAtom,
} from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type MultiSelectFieldAtom<Value = string> = ValidatedFieldAtom<Value[]>;

export const multiSelectField = <Value = string>({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ValidatedFieldAtomConfig<Value[]>> & ZodParams = {}) =>
  validatedFieldAtom({
    value: [],
    schema: z.array(z.string()).nonempty(required_error),
    optionalSchema: z.array(z.string()),
    ...config,
  });
