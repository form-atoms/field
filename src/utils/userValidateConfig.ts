import { type Getter } from "jotai";
import { z } from "zod";

import { type ValidateConfig } from "./schemaValidate";

interface MakeSchema<Schema extends z.Schema> {
  (fieldSchema: Schema): Schema;
  (fieldSchema: Schema, get: Getter): Schema;
}

export type UserValidateConfig<
  Schema extends z.Schema,
  OptSchema extends z.Schema,
> = {
  /**
   * User's zod schema, or a function to enhance the initial field schema.
   */
  schema?: Schema | MakeSchema<Schema>;
  optionalSchema?: OptSchema | MakeSchema<OptSchema>;
};

export type InitialSchemas<
  Schema extends z.Schema,
  OptSchema extends z.Schema,
> = {
  /**
   * The default schema of a field.
   */
  schema: Schema;
  optionalSchema?: OptSchema;
};

/**
 * A helper to combine user schema with the initial field schema.
 * When the user schema is not dependend on other atoms (single argument function),
 * the extended zod functions are pre-computed as to not combine them in each validate call.
 * @param initial the default schemas of a field.
 * @param user the optional user schemas or extend functions.
 * @returns
 */
export function prepareSchema<
  Schema extends z.Schema,
  OptSchema extends z.Schema,
>({
  initial,
  user,
}: {
  initial: InitialSchemas<Schema, OptSchema>;
  user: Partial<UserValidateConfig<Schema, OptSchema>>;
}): ValidateConfig<Schema, OptSchema> {
  return {
    schema: user.schema
      ? applySchema(initial.schema, user.schema)
      : initial.schema,
    optionalSchema:
      user.optionalSchema && initial.optionalSchema
        ? applySchema(initial.optionalSchema, user.optionalSchema)
        : initial.optionalSchema,
  };
}

function applySchema<Schema extends z.Schema>(
  initialSchema: Schema,
  userSchema: Schema | MakeSchema<Schema>,
) {
  if (typeof userSchema === "function") {
    if (userSchema.length === 1) {
      return userSchema(initialSchema);
    } else {
      return (get: Getter) => userSchema(initialSchema, get);
    }
  } else {
    return userSchema;
  }
}
