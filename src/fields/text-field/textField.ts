import { ExtractAtomValue } from "jotai";
import { ZodString, z } from "zod";

import { zodField } from "..";
import { prepareSchema } from "../../utils";
import { FieldConfig } from "../field";
import { defaultParams } from "../zod-field/zodParams";

export type TextField = ReturnType<typeof textField>;

export type TextFieldValue = ExtractAtomValue<
  ExtractAtomValue<TextField>["value"]
>;

export const textField = ({
  required_error = defaultParams.required_error,
  value = "",
  schema,
  optionalSchema,
  ...config
}: FieldConfig<ZodString, ZodString> = {}) => {
  return zodField({
    value,
    ...prepareSchema({
      initial: {
        // https://github.com/colinhacks/zod/issues/63
        schema: z.string().trim().min(1, required_error),
        optionalSchema: z.string().trim(),
      },
      user: {
        schema,
        optionalSchema,
      },
    }),
    ...config,
  });
};
