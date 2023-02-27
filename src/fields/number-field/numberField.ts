import { z } from "zod";

import {
  ValidatedFieldAtom,
  ValidatedFieldAtomConfig,
  validatedFieldAtom,
} from "..";

type NumberValue = number | undefined;

export type NumberFieldAtom = ValidatedFieldAtom<NumberValue>;

export const numberField = (
  config: Partial<ValidatedFieldAtomConfig<NumberValue>> = {}
) =>
  validatedFieldAtom({
    value: undefined,
    schema: z.number({ required_error: "This field is required" }),
    ...config,
  });
