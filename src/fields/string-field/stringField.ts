import { ExtractAtomValue } from "jotai";
import { ZodString, z } from "zod";

import { ZodFieldConfig, zodField } from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type StringFieldAtom = ReturnType<typeof stringField>;

export type StringFieldValue = ExtractAtomValue<
  ExtractAtomValue<StringFieldAtom>["value"]
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
