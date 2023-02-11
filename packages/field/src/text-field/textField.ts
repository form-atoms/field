import { z } from "zod";
import { FieldAtom } from "form-atoms";
import {
  fieldAtomWithValidation,
  FieldAtomWithValidationConfig,
} from "../field-atom-with-validation";

export type TextValue = string | undefined;

export type TextFieldAtom = FieldAtom<TextValue>;

export const textField = (
  config: Partial<FieldAtomWithValidationConfig<TextValue>> = {}
) =>
  fieldAtomWithValidation({
    value: undefined,
    schema: z.string({ required_error: "This field is required" }),
    ...config,
  });
