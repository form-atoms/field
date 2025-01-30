import { ExtractAtomValue } from "jotai";
import { ZodBoolean, ZodLiteral, z } from "zod";

import { zodField } from "..";
import { FieldConfig } from "../field";

export type CheckboxField = ReturnType<typeof checkboxField>;

export type CheckboxFieldValue = ExtractAtomValue<
  ExtractAtomValue<CheckboxField>["value"]
>;

export const checkboxField = ({
  required_error,
  value = false,
  ...config
}: Partial<
  Omit<
    FieldConfig<ZodLiteral<true>, ZodBoolean>,
    "schema" | "optionalSchema" | "validate"
  >
> = {}) =>
  zodField({
    value,
    /**
     * When checkbox is required, it must be checked, so the value must be true.
     */
    schema: z.literal(
      true,
      required_error
        ? {
            errorMap: (issue) => {
              return issue.code === "invalid_literal"
                ? { message: required_error }
                : { message: issue.message ?? "Invalid" };
            },
          }
        : undefined,
    ),
    optionalSchema: z.boolean(),
    ...config,
  });
