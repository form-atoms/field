import { FieldAtom } from "form-atoms";
import { z } from "zod";
import {
  fieldAtomWithValidation,
  FieldAtomWithValidationConfig,
} from "../field-atom-with-validation";

type NumberValue = number | undefined;

export type NumberFieldAtom = FieldAtom<NumberValue>;

export const numberField = (
  config: Partial<FieldAtomWithValidationConfig<NumberValue>> = {}
) =>
  fieldAtomWithValidation({
    value: undefined,
    schema: z.number({ required_error: "This field is required" }),
    ...config,
  });
