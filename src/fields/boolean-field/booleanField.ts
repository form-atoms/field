import { ExtractAtomValue } from "jotai";
import { ZodBoolean, z } from "zod";

import { zodField } from "..";
import { FieldConfig } from "../field";
import { defaultParams } from "../zod-field/zodParams";

export type BooleanField = ReturnType<typeof booleanField>;

export type BooleanFieldValue = ExtractAtomValue<
  ExtractAtomValue<BooleanField>["value"]
>;

export const booleanField = ({
  required_error = defaultParams.required_error,
  ...config
}: Omit<FieldConfig<ZodBoolean>, "schema" | "optionalSchema"> = {}) =>
  zodField({
    value: undefined,
    schema: z.boolean({ required_error }),
    ...config,
  });
