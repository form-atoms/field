import { z } from "zod";
import { FieldAtom } from "form-atoms";
import {
  fieldAtomWithValidation,
  FieldAtomWithValidationConfig,
} from "../field-atom-with-validation";

export type SelectFieldAtom<Value = string> = FieldAtom<Value | undefined>;

// possibly validate option literals, or union of literals
// https://zod.dev/?id=unions
export const selectField = <Value = string>(
  config: Partial<FieldAtomWithValidationConfig<Value | undefined>> = {}
) =>
  fieldAtomWithValidation({
    value: undefined,
    schema: z.string({ required_error: "This field is required" }),
    ...config,
  });
