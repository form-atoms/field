import { type ExtractAtomValue } from "jotai";
import { ZodDate, z } from "zod";

import { zodField } from "..";
import { prepareSchema } from "../../utils";
import { type FieldConfig } from "../field";

export type DateField = ReturnType<typeof dateField>;

export type DateFieldValue = ExtractAtomValue<
  ExtractAtomValue<DateField>["value"]
>;

export const dateField = ({
  required_error,
  schema,
  optionalSchema,
  ...config
}: FieldConfig<ZodDate> = {}) =>
  zodField({
    value: undefined,
    ...prepareSchema({
      initial: {
        schema: z.date({ error: required_error }),
      },
      user: { schema, optionalSchema },
    }),
    ...config,
  });
