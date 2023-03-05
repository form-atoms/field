import { ExtractAtomValue } from "jotai";
import { z } from "zod";

import { ZodFieldConfig, zodField } from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type FileField = ReturnType<typeof fileField>;

export type FileFieldValue = ExtractAtomValue<
  ExtractAtomValue<FileField>["value"]
>;

const fileListInstanceSchema = z.instanceof(FileList);
type ZodFileListInstance = typeof fileListInstanceSchema;

export const fileField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ZodFieldConfig<ZodFileListInstance>> & ZodParams = {}) =>
  zodField({
    value: undefined,
    schema: z.instanceof(FileList, required_error),
    ...config,
  });
