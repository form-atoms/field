import { ExtractAtomValue } from "jotai";
import { z } from "zod";

import { ArrayFieldParams, arrayField } from "..";

export type FilesField = ReturnType<typeof filesField>;

export type FilesFieldValue = ExtractAtomValue<
  ExtractAtomValue<FilesField>["value"]
>;

const isServer = typeof window === "undefined";

// the File constructor does not exist in node, so we must prevent getting reference error
const elementSchema = isServer ? z.never() : z.instanceof(File);

export const filesField = (
  params: Partial<ArrayFieldParams<typeof elementSchema>> = {}
) =>
  arrayField({
    elementSchema,
    ...params,
  });
