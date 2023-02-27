import { z } from "zod";

import {
  ValidatedFieldAtom,
  ValidatedFieldAtomConfig,
  validatedFieldAtom,
} from "..";

export type SelectFieldAtom<Value = string> = ValidatedFieldAtom<
  Value | undefined
>;

// possibly validate option literals, or union of literals
// https://zod.dev/?id=unions
export const selectField = <Value = string>(
  config: Partial<ValidatedFieldAtomConfig<Value | undefined>> = {}
) =>
  validatedFieldAtom({
    value: undefined,
    schema: z.string({ required_error: "This field is required" }),
    ...config,
  });
