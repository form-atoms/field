import { ExtractAtomValue } from "jotai";
import { ZodString, z } from "zod";

import { ValidatedFieldAtomConfig, validatedFieldAtom } from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type TextFieldAtom = ReturnType<typeof textField>;

export type TextFieldValue = ExtractAtomValue<
  ExtractAtomValue<TextFieldAtom>["value"]
>;

export const textField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ValidatedFieldAtomConfig<ZodString, ZodString>> & ZodParams = {}) =>
  validatedFieldAtom({
    value: "",
    // https://github.com/colinhacks/zod/issues/63
    schema: z.string().trim().min(1, required_error),
    optionalSchema: z.string().trim(),
    ...config,
  });
