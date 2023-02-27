import { z } from "zod";

import {
  ValidatedFieldAtom,
  ValidatedFieldAtomConfig,
  validatedFieldAtom,
} from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type FileValue = FileList | undefined;

export type FileFieldAtom = ValidatedFieldAtom<FileValue>;

export const fileField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ValidatedFieldAtomConfig<FileValue>> & ZodParams = {}) =>
  validatedFieldAtom({
    value: undefined,
    schema: z.instanceof(FileList, required_error),
    ...config,
  });
