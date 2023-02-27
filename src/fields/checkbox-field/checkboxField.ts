import { z } from "zod";

import { ValidatedFieldAtomConfig, validatedFieldAtom } from "..";

export type CheckboxValue = boolean;

export const checkboxField = (
  config: Partial<ValidatedFieldAtomConfig<CheckboxValue>> = {}
) =>
  validatedFieldAtom({
    value: false,
    schema: z.literal(true, {
      errorMap: (issue) => {
        return issue.code === "invalid_literal"
          ? { message: "This field is required" }
          : { message: issue.message ?? "Invalid" };
      },
    }),
    optionalSchema: z.boolean(),
    ...config,
  });
