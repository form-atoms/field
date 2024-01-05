import { ArrayCardinality, ZodAny, ZodArray, ZodSchema, z } from "zod";

import {
  ZodField,
  ZodFieldConfig,
  ZodParams,
  defaultParams,
  zodField,
} from "../zod-field";

export type ZodArrayField<Element extends ZodSchema = ZodAny> = ZodField<
  ZodArray<Element, ArrayCardinality>,
  ZodArray<Element, ArrayCardinality>
>;

export type ArrayFieldParams<ElementSchema extends z.Schema> = Partial<
  ZodFieldConfig<
    ZodArray<ElementSchema, "atleastone">,
    ZodArray<ElementSchema, "many">
  >
> &
  ZodParams;

export const arrayField = <ElementSchema extends z.Schema>({
  required_error = defaultParams.required_error,
  value = [],
  elementSchema,
  ...config
}: { elementSchema: ElementSchema } & ArrayFieldParams<ElementSchema>) =>
  zodField({
    value,
    schema: z.array(elementSchema).nonempty(required_error),
    optionalSchema: z.array(elementSchema),
    ...config,
  });
