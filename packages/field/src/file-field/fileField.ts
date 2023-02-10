import { FieldAtom } from "form-atoms";
import { z } from "zod";
import {
  fieldAtomWithValidation,
  FieldAtomWithValidationConfig,
} from "../field-atom-with-validation";

type FileValue = FileList | undefined;

export type FileFieldAtom = FieldAtom<FileValue>;

export const fileField = (
  config: Partial<FieldAtomWithValidationConfig<FileValue>> = {}
) =>
  fieldAtomWithValidation({
    value: undefined,
    schema: z.instanceof(FileList, "This field is required"),
    ...config,
  });
