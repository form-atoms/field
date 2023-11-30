import { ExtractAtomValue } from "jotai";
import { ZodString, z } from "zod";

import { ZodFieldConfig, zodField } from "..";
import { ZodParams, defaultParams } from "../zod-field/zodParams";

export type TextField = ReturnType<typeof textField>;

export type TextFieldValue = ExtractAtomValue<
  ExtractAtomValue<TextField>["value"]
>;

export const textField = ({
  required_error = defaultParams.required_error,
  value = "",
  ...config
}: Partial<ZodFieldConfig<ZodString, ZodString>> & ZodParams = {}) =>
  zodField({
    value,
    // https://github.com/colinhacks/zod/issues/63
    schema: z.string().trim().min(1, required_error),
    optionalSchema: z.string().trim(),
    ...config,
  });
