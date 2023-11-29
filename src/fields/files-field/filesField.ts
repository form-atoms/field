import { ExtractAtomValue, atom } from "jotai";
import { atomEffect } from "jotai-effect";
import { z } from "zod";

import { ArrayFieldParams, arrayField } from "..";

export type FilesField = ReturnType<typeof filesField>;

export type FilesFieldValue = ExtractAtomValue<
  ExtractAtomValue<FilesField>["value"]
>;

const isServer = typeof window === "undefined";

// the File constructor does not exist in node, so we must prevent getting reference error
const elementSchema = isServer ? z.never() : z.instanceof(File);

export const filesArrayField = arrayField({ elementSchema });

const makeClearInputEffect = (atom: typeof filesArrayField) => {
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

export const filesField = (
  params: Partial<ArrayFieldParams<typeof elementSchema>> = {},
) => {
  const fieldAtom = arrayField({
    elementSchema,
    ...params,
  });

  const clearInputEffect = makeClearInputEffect(fieldAtom);

  const filesField = atom((get) => {
    const field = get(fieldAtom);
    get(clearInputEffect); // mount effect

    return { ...field, clearInputEffect };
  });

  return Object.assign(filesField, {
    optional: () => {
      const optionalFieldAtom = fieldAtom.optional();
      const clearInputEffect = makeClearInputEffect(optionalFieldAtom);

      const optionalFilesField = atom((get) => {
        const field = get(optionalFieldAtom);
        get(clearInputEffect); // mount effect

        return { ...field, clearInputEffect };
      });

      return Object.assign(optionalFilesField, {
        optional: () => optionalFilesField,
      });
    },
  }) as unknown as typeof filesArrayField;
};
