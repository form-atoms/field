import { ExtractAtomValue } from "jotai";
import { ZodDate, z } from "zod";

import { ZodFieldConfig, zodField } from "..";
import { ZodParams, defaultParams } from "../zod-field/zodParams";

export type DateField = ReturnType<typeof dateField>;

export type DateFieldValue = ExtractAtomValue<
  ExtractAtomValue<DateField>["value"]
>;

export const dateField = ({
  required_error = defaultParams.required_error,
  ...config
}: Partial<ZodFieldConfig<ZodDate>> & ZodParams = {}) =>
  zodField({
    value: undefined,
    schema: z.date({ required_error }),
    ...config,
  });
