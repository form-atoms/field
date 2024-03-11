import type { ArrayCardinality, ZodAny, ZodArray, ZodSchema } from "zod";
import { z } from "zod";

import { prepareSchema } from "../../utils";
import { FieldConfig } from "../field";
import { type ZodField, defaultParams, zodField } from "../zod-field";

export type ZodArrayField<Element extends ZodSchema = ZodAny> = ZodField<
  ZodArray<Element, ArrayCardinality>,
  ZodArray<Element, ArrayCardinality>
>;

export type ArrayFieldParams<ElementSchema extends z.Schema> = FieldConfig<
  ZodArray<ElementSchema, "atleastone">,
  ZodArray<ElementSchema, "many">
>;

export const arrayField = <ElementSchema extends z.Schema>({
  required_error = defaultParams.required_error,
  value = [],
  elementSchema,
  schema,
  optionalSchema,
  ...config
}: { elementSchema: ElementSchema } & ArrayFieldParams<ElementSchema>) =>
  zodField({
    value,
    ...prepareSchema({
      initial: {
        schema: z.array(elementSchema).nonempty(required_error),
        optionalSchema: z.array(elementSchema),
      },
      user: {
        schema,
        optionalSchema,
      },
    }),
    ...config,
  });
