import { ExtractAtomValue } from "jotai";
import { ZodBoolean, z } from "zod";

import { ZodFieldConfig, zodField } from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type BooleanField = ReturnType<typeof booleanField>;

export type BooleanFieldValue = ExtractAtomValue<
  ExtractAtomValue<BooleanField>["value"]
>;

export const booleanField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ZodFieldConfig<ZodBoolean>> & ZodParams = {}) =>
  zodField({
    value: undefined,
    schema: z.boolean({ required_error }),
    ...config,
  });
