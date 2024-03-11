import { ExtractAtomValue } from "jotai";
import { ZodString, z } from "zod";

import { zodField } from "..";
import { prepareSchema } from "../../utils";
import { FieldConfig } from "../field";
import { defaultParams } from "../zod-field/zodParams";

export type StringField = ReturnType<typeof stringField>;

export type StringFieldValue = ExtractAtomValue<
  ExtractAtomValue<StringField>["value"]
>;

export const stringField = ({
  required_error = defaultParams.required_error,
  schema,
  optionalSchema,
  ...config
}: FieldConfig<ZodString> = {}) =>
  zodField({
    value: undefined,
    ...prepareSchema({
      initial: {
        schema: z.string({ required_error }),
      },
      user: { schema, optionalSchema },
    }),
    ...config,
  });
