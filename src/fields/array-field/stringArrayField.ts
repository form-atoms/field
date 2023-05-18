import { ExtractAtomValue } from "jotai";
import { z } from "zod";

import { arrayField } from "./arrayField";
import { ZodParams } from "../zodParams";

export const stringArrayField = (
  params: ZodParams & {
    value?: string[];
    name?: string;
  } = {}
) => arrayField({ elementSchema: z.string(), ...params });

export type StringArrayField = ReturnType<typeof stringArrayField>;

export type StringArrayFieldValue = ExtractAtomValue<
  ExtractAtomValue<StringArrayField>["value"]
>;
