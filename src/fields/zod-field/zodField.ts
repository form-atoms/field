import { FieldAtom, FieldAtomConfig, fieldAtom } from "form-atoms";
import { Atom } from "jotai";
import { ZodAny, ZodUndefined, z } from "zod";

import { ExtendFieldAtom, extendFieldAtom } from "../../atoms/extendFieldAtom";
import {
  ReadRequired,
  ValidateConfig,
  WritableRequiredAtom,
  schemaValidate,
} from "../../atoms/schemaValidate";

export type ZodFieldConfig<
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodUndefined,
> = FieldAtomConfig<Schema["_output"] | OptSchema["_output"]> &
  ValidateConfig<Schema, OptSchema> & { nameAtom?: Atom<string> };

export type ZodFieldValue<Field> =
  Field extends FieldAtom<infer Value> ? Value : never;

export type ZodFieldSubmitValue<Field> =
  Field extends ZodField<infer Schema, infer OptSchema, infer Required>
    ? Required extends WritableRequiredAtom
      ? Schema["_output"] | OptSchema["_output"]
      : Required extends Atom<boolean>
        ? Schema["_output"]
        : never
    : never;

export type OptionalZodField<
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodUndefined,
> = ZodField<Schema, OptSchema, WritableRequiredAtom>; // for OptionalZodField we can write false to the required atom

/**
 * This is an alias to ZodField, it hides the 3rd argument from type tooltip.
 */
type RequiredZodField<
  Schema extends z.Schema = ZodAny,
  OptSchema extends z.Schema = ZodUndefined,
> = ZodField<Schema, OptSchema>;

export type ZodField<
  Schema extends z.Schema = ZodAny,
  OptSchema extends z.Schema = ZodUndefined,
  RequiredAtom = Atom<boolean>,
> = ExtendFieldAtom<
  Schema["_output"] | OptSchema["_output"],
  { required: RequiredAtom }
> & {
  optional: (
    readRequired?: ReadRequired,
  ) => OptionalZodField<Schema, OptSchema>;
};

export function zodField<
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodUndefined,
>({
  schema,
  optionalSchema,
  nameAtom,
  ...config
}: ZodFieldConfig<Schema, OptSchema>) {
  const { validate, requiredAtom, makeOptional } = schemaValidate({
    schema,
    optionalSchema,
  });

  const zodFieldAtom = extendFieldAtom(
    fieldAtom({ ...config, validate }),
    () => ({
      required: requiredAtom,
      ...(nameAtom ? { name: nameAtom } : {}),
    }),
  ) as unknown as RequiredZodField<Schema, OptSchema>;

  zodFieldAtom.optional = (readRequired: ReadRequired = () => false) => {
    const { validate, requiredAtom } = makeOptional(readRequired);

    const optionalZodFieldAtom = extendFieldAtom(
      fieldAtom({ ...config, validate }),
      () => ({
        required: requiredAtom,
        ...(nameAtom ? { name: nameAtom } : {}),
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
