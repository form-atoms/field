import { z } from "zod";

import {
  ValidatedFieldAtom,
  ValidatedFieldAtomConfig,
  validatedFieldAtom,
} from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type CheckboxFieldValue = boolean;

export type CheckboxFieldAtom = ValidatedFieldAtom<CheckboxFieldValue>;

export const checkboxField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ValidatedFieldAtomConfig<CheckboxFieldValue>> & ZodParams = {}) =>
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
