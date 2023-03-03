import { ZodArray, z } from "zod";

import { ZodFieldConfig, zodField } from "..";
import { ZodParams, defaultParams } from "../zodParams";

export const arrayField = <ElementSchema extends z.Schema>({
  required_error = defaultParams.required_error,
  elementSchema,
  ...config
}: { elementSchema: ElementSchema } & Partial<
  ZodFieldConfig<
    ZodArray<ElementSchema, "atleastone">,
    ZodArray<ElementSchema, "many">
  >
> &
  ZodParams) =>
  zodField({
    value: [],
    schema: z.array(elementSchema).nonempty(required_error),
    optionalSchema: z.array(elementSchema),
    ...config,
  });
