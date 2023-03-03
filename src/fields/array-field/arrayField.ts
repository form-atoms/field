import { ZodArray, z } from "zod";

import { ValidatedFieldAtomConfig, validatedFieldAtom } from "..";
import { ZodParams, defaultParams } from "../zodParams";

export const arrayField = <ElementSchema extends z.Schema>({
  required_error = defaultParams.required_error,
  elementSchema,
  ...config
}: { elementSchema: ElementSchema } & Partial<
  ValidatedFieldAtomConfig<
    ZodArray<ElementSchema, "atleastone">,
    ZodArray<ElementSchema, "many">
  >
> &
  ZodParams) =>
  validatedFieldAtom({
    value: [],
    schema: z.array(elementSchema).nonempty(required_error),
    optionalSchema: z.array(elementSchema),
    ...config,
  });
