import { FieldAtomConfig } from "form-atoms";
import { type ZodUndefined, z } from "zod";

import { type ZodParams } from "./zod-field";
import type { UserValidateConfig } from "../utils";

/**
 * A public config for a field.
 */
export type FieldConfig<
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodUndefined,
> = Partial<FieldAtomConfig<z.output<Schema> | z.output<OptSchema>>> &
  UserValidateConfig<Schema, OptSchema> &
  ZodParams;
