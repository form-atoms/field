import { FieldAtom, FieldAtomConfig, fieldAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { Atom, Getter, WritableAtom, atom } from "jotai";
import { RESET, atomWithReset } from "jotai/utils";
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

export type ZodFieldValue<Field> = Field extends FieldAtom<infer Value>
  ? Value
  : never;

export type OptionalZodField<
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodUndefined
> = ZodField<
  Schema,
  OptSchema,
  WritableAtom<
    boolean,
    [boolean | typeof RESET | ((prev: boolean) => boolean)],
    void
  >
>;

export type ZodField<
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodUndefined,
  Required = Atom<boolean>
> = FieldAtom<Schema["_output"] | OptSchema["_output"]> extends Atom<infer R>
  ? {
      optional: () => OptionalZodField<Schema, OptSchema>;
    } & Atom<
      R & {
        required: Required;
      }
    >
  : never;

export const zodField = <
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodUndefined
>({
  schema,
  optionalSchema,
  ...config
}: ZodFieldConfig<Schema, OptSchema>): ZodField<Schema, OptSchema> => {
  const requiredAtom = atom(true); // constant, unwritable when .optional() is not called

  const baseFieldAtom = fieldAtom({
    validate: zodValidate(
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
    const requiredAtom = atomWithReset(false);
    const validateCallback = zodValidate(
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
