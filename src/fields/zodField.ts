import { FieldAtom, FieldAtomConfig, fieldAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { Atom, Getter, WritableAtom, atom } from "jotai";
import { RESET, atomWithReset } from "jotai/utils";
import { ZodNever, z } from "zod";

type ValidationConfig<Schema extends z.Schema, OptSchema extends z.Schema> = {
  optional?: boolean;
  schema: Schema | ((get: Getter) => Schema);
  optionalSchema?: OptSchema | ((get: Getter) => OptSchema);
};

export type ZodFieldConfig<
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodNever
> = FieldAtomConfig<
  | Schema["_output"]
  | (OptSchema extends ZodNever ? undefined : OptSchema["_output"])
> &
  ValidationConfig<Schema, OptSchema>;

export type ZodFieldValue<Field> = Field extends ZodField<
  infer _,
  infer __,
  infer Value
>
  ? Value
  : never;

export type ZodField<
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodNever,
  Value =
    | Schema["_output"]
    | (OptSchema extends ZodNever ? undefined : OptSchema["_output"])
> = FieldAtom<Value> extends Atom<infer R>
  ? Atom<
      R & {
        required: WritableAtom<
          boolean,
          [boolean | typeof RESET | ((prev: boolean) => boolean)],
          void
        >;
      }
    >
  : never;

export const zodField = <
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodNever,
  Value =
    | Schema["_output"]
    | (OptSchema extends ZodNever ? undefined : OptSchema["_output"])
>({
  optional = false, // all fields required similarly as zod is required by default
  schema,
  optionalSchema,
  ...config
}: ZodFieldConfig<Schema, OptSchema>): ZodField<Schema, OptSchema> => {
  const requiredAtom = atomWithReset(!optional);

  const baseFieldAtom = fieldAtom({
    validate: zodValidate<Value>(
      (get) => {
        const required = get(requiredAtom);
        const schemaObj = typeof schema === "function" ? schema(get) : schema;
        const optionalSchemaObj =
          typeof optionalSchema === "function"
            ? optionalSchema(get)
            : optionalSchema;

        const optSchema = optionalSchemaObj ?? schemaObj.optional();

        return required ? schemaObj : optSchema;
      },
      {
        on: "blur",
        when: "dirty",
      }
    ).or({ on: "change", when: "touched" }),
    ...config,
  });

  const zodField = atom((get) => {
    const baseField = get(baseFieldAtom);

    const fieldAtoms = {
      required: requiredAtom,
    };

    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV !== "production"
    ) {
      Object.entries(fieldAtoms).map(([atomName, atom]) => {
        atom.debugLabel = `field/${atomName}/${config.name ?? zodField}`;
      });
    }

    return { ...baseField, ...fieldAtoms };
  });

  zodField.debugLabel = `field/zodField/${config.name ?? zodField}`;

  return zodField;
};
