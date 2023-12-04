import { FieldAtom, FieldAtomConfig, FormAtom, fieldAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { Atom, Getter, WritableAtom, atom } from "jotai";
import { RESET, atomWithReset } from "jotai/utils";
import { ZodAny, ZodUndefined, z } from "zod";

type ValidationConfig<Schema extends z.Schema, OptSchema extends z.Schema> = {
  schema: Schema | ((get: Getter) => Schema);
  optionalSchema?: OptSchema | ((get: Getter) => OptSchema);
};

type Flatten<T> = Identity<{
  [K in keyof T]: T[K];
}>;
type Identity<T> = T;

export type FormSubmitValues<Form extends FormAtom<any>> =
  Form extends FormAtom<infer Fields> ? FormFieldSubmitValues<Fields> : never;

type FormFieldSubmitValues<Fields extends FormFields> = Flatten<{
  [Key in keyof Fields]: Fields[Key] extends ZodField<any>
    ? ZodFieldSubmitValue<Fields[Key]>
    : Fields[Key] extends FieldAtom<infer Value>
      ? Value
      : Fields[Key] extends FormFields
        ? FormFieldSubmitValues<Fields[Key]>
        : Fields[Key] extends Array<infer Item>
          ? Item extends ZodField<any>
            ? ZodFieldSubmitValue<Fields[Key]>[]
            : Item extends FieldAtom<infer Value>
              ? Value[]
              : Item extends FormFields
                ? FormFieldSubmitValues<Item>[]
                : never
          : never;
}>;

type FormFields = {
  [key: string | number]:
    | FieldAtom<any>
    | ZodField<any>
    | FormFields
    | FormFields[]
    | FieldAtom<any>[]
    | ZodField<any>[];
};

export type ZodFieldConfig<
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodUndefined,
> = FieldAtomConfig<Schema["_output"] | OptSchema["_output"]> &
  ValidationConfig<Schema, OptSchema>;

export type ZodFieldValue<Field> = Field extends FieldAtom<infer Value>
  ? Value
  : never;

type WritableRequiredAtom = WritableAtom<
  boolean,
  [boolean | typeof RESET | ((prev: boolean) => boolean)],
  void
>;

type ZodFieldSubmitValue<Field> = Field extends ZodField<
  infer Schema,
  infer OptSchema,
  infer Required
>
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

type ExtendFieldAtom<Value, State> = FieldAtom<Value> extends Atom<
  infer DefaultState
>
  ? Atom<DefaultState & State>
  : never;

export type ZodField<
  Schema extends z.Schema = ZodAny,
  OptSchema extends z.Schema = ZodUndefined,
  RequiredAtom = Atom<boolean>,
> = ExtendFieldAtom<
  Schema["_output"] | OptSchema["_output"],
  { required: RequiredAtom }
> & {
  optional: () => OptionalZodField<Schema, OptSchema>;
};

export function zodField<
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodUndefined,
>({
  schema,
  optionalSchema,
  ...config
}: ZodFieldConfig<Schema, OptSchema>): RequiredZodField<Schema, OptSchema> {
  /**
   * Read-only atom for default zodFields which all are required.
   */
  const requiredAtom = atom(true);

  const baseFieldAtom = fieldAtom({
    validate: zodValidate(
      (get) => {
        const schemaObj = typeof schema === "function" ? schema(get) : schema;
        return schemaObj;
      },
      {
        on: "blur",
        when: "dirty",
      },
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
  }) as unknown as ZodField<Schema, OptSchema>;

  const makeOptional = () => {
    const requiredAtom = atomWithReset(false);

    const baseFieldAtom = fieldAtom({
      validate: zodValidate(
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
        },
      ).or({ on: "change", when: "touched" }),
      ...config,
    });

    const optionalZodField = atom((get) => {
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

      return {
        ...baseField,
        ...fieldAtoms,
      };
    }) as OptionalZodField<Schema, OptSchema>;

    optionalZodField.optional = () => optionalZodField;
    optionalZodField.debugLabel = `optionalZodField/${config.name ?? zodField}`;

    return optionalZodField;
  };

  zodField.optional = makeOptional;
  zodField.debugLabel = `zodField/${config.name ?? zodField}`;

  return zodField;
}
