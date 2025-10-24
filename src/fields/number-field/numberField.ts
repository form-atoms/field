import { ExtractAtomValue } from "jotai";
import { ZodNumber, z } from "zod";

import { zodField } from "..";
import { prepareSchema } from "../../utils";
import { FieldConfig } from "../field";

export type NumberField = ReturnType<typeof numberField>;

export type NumberFieldValue = ExtractAtomValue<
  ExtractAtomValue<NumberField>["value"]
>;

export const numberField = ({
  required_error,
  schema,
  optionalSchema,
  ...config
}: FieldConfig<ZodNumber> = {}) =>
  zodField({
    value: undefined,
    ...prepareSchema({
      initial: {
        schema: z.number({ error: required_error }),
      },
      user: { schema, optionalSchema },
    }),
    ...config,
  });
