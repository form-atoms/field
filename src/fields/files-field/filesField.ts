import { ExtractAtomValue, atom } from "jotai";
import { atomEffect } from "jotai-effect";
import { z, ZodArray, ZodFile } from "zod";

import {
  ArrayFieldParams,
  RequiredZodField,
  ZodArrayField,
  arrayField,
} from "..";

export type FilesField = ReturnType<typeof filesField>;

export type FilesFieldValue = ExtractAtomValue<
  ExtractAtomValue<FilesField>["value"]
>;

const makeClearInputEffect = (atom: ZodArrayField<ZodFile>) => {
  const effect = atomEffect((get) => {
    const field = get(atom);
    const value = get(field.value);
    const ref = get(field.ref);

    if (value.length === 0) {
      if (ref) {
        ref.value = "";
      }
    }
  });

  effect.debugPrivate = true;

  return effect;
};

export const filesField = (params: Partial<ArrayFieldParams<ZodFile>> = {}) => {
  const fieldAtom = arrayField({
    elementSchema: z.file(),
    ...params,
  });

  const clearInputEffect = makeClearInputEffect(fieldAtom);

  const filesField = atom((get) => {
    const field = get(fieldAtom);
    get(clearInputEffect); // mount effect

    return { ...field, clearInputEffect };
  });

  return Object.assign(filesField, {
    optional() {
      const optionalFieldAtom = fieldAtom.optional();
      const clearInputEffect = makeClearInputEffect(optionalFieldAtom);

      const optionalFilesField = atom((get) => {
        const field = get(optionalFieldAtom);
        get(clearInputEffect); // mount effect

        return { ...field, clearInputEffect };
      });

      return Object.assign(optionalFilesField, {
        optional() {
          return optionalFilesField;
        },
      });
    },
  }) as unknown as RequiredZodField<ZodArray<ZodFile>, ZodArray<ZodFile>>;
};
