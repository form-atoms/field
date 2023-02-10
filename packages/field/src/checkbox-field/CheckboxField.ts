import { z } from "zod";
import {
  fieldAtomWithValidation,
  FieldAtomWithValidationConfig,
} from "../field-atom-with-validation";

export type CheckboxValue = boolean;

export const checkboxField = (
  config: Partial<FieldAtomWithValidationConfig<CheckboxValue>> = {}
) =>
  fieldAtomWithValidation({
    value: false,
    schema: z.literal(true, {
      errorMap: (issue) =>
        issue.code === "invalid_literal"
          ? { message: "This field is required" }
          : { message: issue.message ?? "Invalid" },
    }),
    ...config,
  });
