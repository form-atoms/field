import { ExtractAtomValue } from "jotai";
import { z } from "zod";

import { ArrayFieldParams, arrayField } from "./arrayField";

const elementSchema = z.string();

export const stringArrayField = (
  params: Partial<ArrayFieldParams<typeof elementSchema>> = {}
) => arrayField({ elementSchema, ...params });

export type StringArrayField = ReturnType<typeof stringArrayField>;

export type StringArrayFieldValue = ExtractAtomValue<
  ExtractAtomValue<StringArrayField>["value"]
>;
