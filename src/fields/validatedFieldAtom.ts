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

export type ValidatedFieldAtomConfig<
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodNever
> = FieldAtomConfig<
  | Schema["_output"]
  | (OptSchema extends ZodNever ? undefined : OptSchema["_output"])
> &
  ValidationConfig<Schema, OptSchema>;

export type ValidatedFieldAtom<Value> = FieldAtom<Value> extends Atom<infer R>
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

export const validatedFieldAtom = <
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
}: ValidatedFieldAtomConfig<Schema, OptSchema>): ValidatedFieldAtom<Value> => {
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
        on: "change",
      }
    ),
    ...config,
  });

  const validatedAtom = atom((get) => {
    const baseField = get(baseFieldAtom);

    const fieldAtoms = {
      required: requiredAtom,
    };

    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV !== "production"
    ) {
      Object.entries(fieldAtoms).map(([atomName, atom]) => {
        atom.debugLabel = `field/${atomName}/${
          config.name ?? "<unnamed-field>"
        }`;
      });
    }

    return { ...baseField, ...fieldAtoms };
  });

  validatedAtom.debugLabel = `field/${config.name}`;
  return validatedAtom;
};
