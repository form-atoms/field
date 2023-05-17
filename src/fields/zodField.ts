import { FieldAtom, FieldAtomConfig, fieldAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { Atom, Getter, atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { ZodUndefined, z } from "zod";

type ValidationConfig<Schema extends z.Schema, OptSchema extends z.Schema> = {
  schema: Schema | ((get: Getter) => Schema);
  optionalSchema?: OptSchema | ((get: Getter) => OptSchema);
};

export type ZodFieldConfig<
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodUndefined
> = FieldAtomConfig<Schema["_output"] | OptSchema["_output"]> &
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
  OptSchema extends z.Schema = ZodUndefined,
  Value = Schema["_output"] | OptSchema["_output"]
> = FieldAtom<Value> extends Atom<infer R>
  ? {
      optional: () => ZodField<Schema, OptSchema, Value>;
    } & Atom<
      R & {
        required: Atom<boolean>;
      }
    >
  : never;

export const zodField = <
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodUndefined,
  Value = Schema["_output"] | OptSchema["_output"]
>({
  schema,
  optionalSchema,
  ...config
}: ZodFieldConfig<Schema, OptSchema>): ZodField<Schema, OptSchema> => {
  const requiredAtom = atomWithReset(true);

  const baseFieldAtom = fieldAtom({
    validate: zodValidate<Value>(
      (get) => {
        const schemaObj = typeof schema === "function" ? schema(get) : schema;
        return schemaObj;
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

  const makeOptional = () => {
    const requiredAtom = atom(false);
    const validateCallback = zodValidate<Value>(
      (get) => {
        const schemaObj = typeof schema === "function" ? schema(get) : schema;

        const optionalSchemaObj =
          typeof optionalSchema === "function"
            ? optionalSchema(get)
            : optionalSchema;

        const optSchema = optionalSchemaObj ?? schemaObj.optional();

        return optSchema;
      },
      {
        on: "blur",
        when: "dirty",
      }
    ).or({ on: "change", when: "touched" });

    const zodField = atom((get) => {
      const baseField = get(baseFieldAtom);

      const fieldAtoms = {
        required: requiredAtom,
        validate: validateCallback,
      };

      if (
        typeof process !== "undefined" &&
        process.env.NODE_ENV !== "production"
      ) {
        Object.entries(fieldAtoms).map(([atomName, atom]) => {
          atom.debugLabel = `field/${atomName}/${config.name ?? zodField}`;
        });
      }

      return {
        ...baseField,
        ...fieldAtoms,
        _validateCallback: validateCallback,
      };
    });

    // TODO: no need to call .optional().optional()
    return { ...zodField, optional: makeOptional };
  };

  return { ...zodField, optional: makeOptional };
};
