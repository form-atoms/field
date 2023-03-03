import { ExtractAtomValue } from "jotai";
import { z } from "zod";

import { ValidatedFieldAtomConfig, validatedFieldAtom } from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type FileFieldAtom = ReturnType<typeof fileField>;

export type FileFieldValue = ExtractAtomValue<
  ExtractAtomValue<FileFieldAtom>["value"]
>;

const fileListInstanceSchema = z.instanceof(FileList);
type ZodFileListInstance = typeof fileListInstanceSchema;

export const fileField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ValidatedFieldAtomConfig<ZodFileListInstance>> & ZodParams = {}) =>
  validatedFieldAtom({
    value: undefined,
    schema: z.instanceof(FileList, required_error),
    ...config,
  });
