import { ExtractAtomValue } from "jotai";
import { ZodBoolean, ZodLiteral, z } from "zod";

import { ZodFieldConfig, zodField } from "..";
import { ZodParams, defaultParams } from "../zod-field/zodParams";

export type CheckboxField = ReturnType<typeof checkboxField>;

export type CheckboxFieldValue = ExtractAtomValue<
  ExtractAtomValue<CheckboxField>["value"]
>;

export const checkboxField = ({
  required_error = defaultParams.required_error,
  value = false,
  ...config
}: Partial<
  Omit<
    ZodFieldConfig<ZodLiteral<true>, ZodBoolean>,
    "schema" | "optionalSchema" | "validate"
  >
> &
  ZodParams = {}) =>
  zodField({
    value,
    /**
     * When checkbox is required, it must be checked, so the value must be true.
     */
    schema: z.literal(true, {
      errorMap: (issue) => {
        return issue.code === "invalid_literal"
          ? { message: required_error }
          : { message: issue.message ?? "Invalid" };
      },
    }),
    optionalSchema: z.boolean(),
    ...config,
  });
