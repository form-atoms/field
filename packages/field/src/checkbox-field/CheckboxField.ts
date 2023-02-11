import { z } from "zod";
import { validatedFieldAtom, ValidatedFieldAtomConfig } from "../field";

export type CheckboxValue = boolean;

export const checkboxField = (
  config: Partial<ValidatedFieldAtomConfig<CheckboxValue>> = {}
) =>
  validatedFieldAtom({
    value: false,
    schema: z.literal(true, {
      errorMap: (issue) =>
        issue.code === "invalid_literal"
          ? { message: "This field is required" }
          : { message: issue.message ?? "Invalid" },
    }),
    ...config,
  });
