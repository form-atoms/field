import { z } from "zod";

import {
  ValidatedFieldAtom,
  ValidatedFieldAtomConfig,
  validatedFieldAtom,
} from "..";
import { ZodParams, defaultParams } from "../zodParams";

export type FileFieldValue = FileList | undefined;

export type FileFieldAtom = ValidatedFieldAtom<FileFieldValue>;

export const fileField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ValidatedFieldAtomConfig<FileFieldValue>> & ZodParams = {}) =>
  validatedFieldAtom({
    value: undefined,
    schema: z.instanceof(FileList, required_error),
    ...config,
  });
