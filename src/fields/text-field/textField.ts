import { z } from "zod";

import {
  ValidatedFieldAtom,
  ValidatedFieldAtomConfig,
  validatedFieldAtom,
} from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type TextFieldValue = string;

export type TextFieldAtom = ValidatedFieldAtom<TextFieldValue>;

export const textField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ValidatedFieldAtomConfig<TextFieldValue>> & ZodParams = {}) =>
  validatedFieldAtom({
    value: "",
    // https://github.com/colinhacks/zod/issues/63
    schema: z.string().trim().min(1, required_error),
    optionalSchema: z.string().trim(),
    ...config,
  });
