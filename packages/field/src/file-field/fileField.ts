import { z } from "zod";
import {
  validatedFieldAtom,
  ValidatedFieldAtom,
  ValidatedFieldAtomConfig,
} from "../field";

type FileValue = FileList | undefined;

export type FileFieldAtom = ValidatedFieldAtom<FileValue>;

export const fileField = (
  config: Partial<ValidatedFieldAtomConfig<FileValue>> = {}
) =>
  validatedFieldAtom({
    value: undefined,
    schema: z.instanceof(FileList, "This field is required"),
    ...config,
  });
