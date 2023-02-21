import { z } from "zod";

import {
  ValidatedFieldAtom,
  ValidatedFieldAtomConfig,
  validatedFieldAtom,
} from "../field";

export type TextValue = string | undefined;

export type TextFieldAtom = ValidatedFieldAtom<TextValue>;

export const textField = (
  config: Partial<ValidatedFieldAtomConfig<TextValue>> = {}
) =>
  validatedFieldAtom({
    value: undefined,
    schema: z.string({ required_error: "This field is required" }),
    ...config,
  });