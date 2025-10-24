import type { ZodAny, ZodArray, ZodSchema } from "zod";
import { z } from "zod";

import { prepareSchema } from "../../utils";
import { FieldConfig } from "../field";
import { type ZodField, zodField } from "../zod-field";

export type ZodArrayField<Element extends ZodSchema = ZodAny> = ZodField<
  ZodArray<Element>,
  ZodArray<Element>
>;

export type ArrayFieldParams<ElementSchema extends z.Schema> = FieldConfig<
  ZodArray<ElementSchema>,
  ZodArray<ElementSchema>
>;

export const arrayField = <ElementSchema extends z.Schema>({
  required_error,
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
