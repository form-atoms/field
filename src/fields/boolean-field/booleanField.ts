import { ExtractAtomValue } from "jotai";
import { ZodBoolean, z } from "zod";

import { zodField } from "..";
import { FieldConfig } from "../field";

export type BooleanField = ReturnType<typeof booleanField>;

export type BooleanFieldValue = ExtractAtomValue<
  ExtractAtomValue<BooleanField>["value"]
>;

export const booleanField = ({
  required_error,
  ...config
}: Omit<FieldConfig<ZodBoolean>, "schema" | "optionalSchema"> = {}) =>
  zodField({
    value: undefined,
    schema: z.boolean({ error: required_error }),
    ...config,
  });
