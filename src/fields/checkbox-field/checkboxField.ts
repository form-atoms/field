import { ExtractAtomValue } from "jotai";
import { ZodBoolean, ZodLiteral, z } from "zod";

import { ValidatedFieldAtomConfig, validatedFieldAtom } from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type CheckboxFieldAtom = ReturnType<typeof checkboxField>;

export type CheckboxFieldValue = ExtractAtomValue<
  ExtractAtomValue<CheckboxFieldAtom>["value"]
>;

export const checkboxField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<
  Omit<
    ValidatedFieldAtomConfig<ZodLiteral<true>, ZodBoolean>,
    "schema" | "optionalSchema" | "validate"
  >
> &
  ZodParams = {}) =>
  validatedFieldAtom({
    value: false,
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
