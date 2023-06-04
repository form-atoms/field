import { ExtractAtomValue } from "jotai";
import { ZodString, z } from "zod";

import { ZodFieldConfig, zodField } from "..";
import { ZodParams, defaultParams } from "../zod-field/zodParams";

export type StringField = ReturnType<typeof stringField>;

export type StringFieldValue = ExtractAtomValue<
  ExtractAtomValue<StringField>["value"]
>;

export const stringField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ZodFieldConfig<ZodString>> & ZodParams = {}) =>
  zodField({
    value: undefined,
    schema: z.string({ required_error }),
    ...config,
  });
