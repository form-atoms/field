import { type FieldAtom, type FieldAtomConfig, fieldAtom } from "form-atoms";
import { type ZodAny, type ZodUndefined, z } from "zod";

import { extendAtom } from "../../atoms/extendAtom";
import type { ExtendFieldAtom, PrimitiveFieldAtom } from "../../atoms/types";
import {
  type DefaultRequiredAtom,
  type ReadRequired,
  type ValidateConfig,
  type WritableRequiredAtom,
  schemaValidate,
} from "../../utils";

type ZodFieldConfig<
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodUndefined,
> = FieldAtomConfig<z.output<Schema> | z.output<OptSchema>> &
  ValidateConfig<Schema, OptSchema>;

export type ZodFieldValue<Field> =
  Field extends FieldAtom<infer Value> ? Value : never;

export type ZodFieldSubmitValue<Field> =
  Field extends ZodField<infer Schema, infer OptSchema, infer Required>
    ? Required extends WritableRequiredAtom
      ? z.output<Schema> | z.output<OptSchema>
      : Required extends DefaultRequiredAtom
        ? z.output<Schema>
        : never
    : never;

export type OptionalZodField<
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodUndefined,
> = ZodField<Schema, OptSchema, WritableRequiredAtom>; // for OptionalZodField we can write false to the required atom

/**
 * This is an alias to ZodField, it hides the 3rd argument from type tooltip.
 */
export type RequiredZodField<
  Schema extends z.Schema = ZodAny,
  OptSchema extends z.Schema = ZodUndefined,
> = ZodField<Schema, OptSchema>;

export type ZodField<
  Schema extends z.Schema = ZodAny,
  OptSchema extends z.Schema = ZodUndefined,
  RequiredAtom = DefaultRequiredAtom,
> = ExtendFieldAtom<
  z.output<Schema> | z.output<OptSchema>,
  { required: RequiredAtom }
> & {
  optional: (
    readRequired?: ReadRequired,
  ) => OptionalZodField<Schema, OptSchema>;
};

export function zodField<
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodUndefined,
>({ schema, optionalSchema, ...config }: ZodFieldConfig<Schema, OptSchema>) {
  const { validate, requiredAtom, makeOptional } = schemaValidate({
    schema,
    optionalSchema,
  });

  const zodFieldAtom = extendAtom(
    fieldAtom({ ...config, validate }) as unknown as PrimitiveFieldAtom<
      z.output<Schema>
    >,
    () => ({
      required: requiredAtom,
    }),
  ) as unknown as RequiredZodField<Schema, OptSchema>;

  zodFieldAtom.optional = (readRequired: ReadRequired = () => false) => {
    const { validate, requiredAtom } = makeOptional(readRequired);

    const optionalZodFieldAtom = extendAtom(
      fieldAtom({ ...config, validate }) as unknown as PrimitiveFieldAtom<
        z.output<Schema> | z.output<OptSchema>
      >,
      () => ({
        required: requiredAtom,
      }),
    ) as unknown as OptionalZodField<Schema, OptSchema>;

    optionalZodFieldAtom.optional = () => optionalZodFieldAtom;

    return optionalZodFieldAtom;
  };

  return zodFieldAtom;
}

// if (
//   typeof process !== "undefined" &&
//   process.env.NODE_ENV !== "production"
// ) {
//   Object.entries(fieldAtoms).map(([atomName, atom]) => {
//     atom.debugLabel = `field/${atomName}/${config.name ?? zodField}`;
//   });
// }
