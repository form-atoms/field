import { ExtractAtomValue } from "jotai";
import { z } from "zod";

import { ZodFieldConfig, zodField } from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type FileField = ReturnType<typeof fileField>;

export type FileFieldValue = ExtractAtomValue<
  ExtractAtomValue<FileField>["value"]
>;

const isServer = typeof window === "undefined";

const fileFieldSchema = z.array(isServer ? z.undefined() : z.instanceof(File));
type ZodFileFieldSchema = typeof fileFieldSchema;

export const fileField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ZodFieldConfig<ZodFileFieldSchema>> & ZodParams = {}) =>
  zodField({
    value: undefined,
    schema: z.array(isServer ? z.undefined() : z.instanceof(File), {
      required_error,
    }),
    ...config,
  });
