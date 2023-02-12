import { z } from "zod";

import { ValidatedFieldAtomConfig, validatedFieldAtom } from "../field";

export type CheckboxValue = boolean;

export const checkboxField = (
  config: Partial<ValidatedFieldAtomConfig<CheckboxValue>> = {}
) =>
  validatedFieldAtom({
    value: false,
    schema: config.optional
      ? z.boolean()
      : z.literal(true, {
          errorMap: (issue) => {
            return issue.code === "invalid_literal"
              ? { message: "This field is required" }
              : { message: issue.message ?? "Invalid" };
          },
        }),
    ...config,
  });
