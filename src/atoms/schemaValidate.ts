import { RESET } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { Atom, Getter, WritableAtom, atom } from "jotai";
import { ZodUndefined, z } from "zod";

export type ValidateConfig<
  Schema extends z.Schema,
  OptSchema extends z.Schema,
> = {
  schema: Schema | ((get: Getter) => Schema);
  optionalSchema?: OptSchema | ((get: Getter) => OptSchema);
};

export type WritableRequiredAtom = WritableAtom<
  boolean,
  [boolean | typeof RESET | ((prev: boolean) => boolean)],
  void
>;

/**
 * Read-only atom for default zodFields which all are required.
 */
const defaultRequiredAtom = atom(true as const);
defaultRequiredAtom.debugLabel = "zodField/defaultRequired";

export function schemaValidate<
  Schema extends z.Schema,
  OptSchema extends z.Schema = ZodUndefined,
>({ schema, optionalSchema }: ValidateConfig<Schema, OptSchema>) {
  const validate = zodValidate(
    (get) => {
      const schemaObj = typeof schema === "function" ? schema(get) : schema;
      return schemaObj;
    },
    {
      on: "blur",
      when: "dirty",
    },
  ).or({ on: "change", when: "touched" });

  const makeOptional = (readRequired: Atom<boolean>["read"] = () => false) => {
    const requiredAtom = atom(readRequired);
    const validate = zodValidate(
      (get) => {
        const schemaObj = typeof schema === "function" ? schema(get) : schema;

        const optionalSchemaObj =
          typeof optionalSchema === "function"
            ? optionalSchema(get)
            : optionalSchema;

        const optSchema = optionalSchemaObj ?? schemaObj.optional();

        const isRequired = get(requiredAtom);

        return isRequired ? schemaObj : optSchema;
      },
      {
        on: "blur",
        when: "dirty",
      },
    ).or({ on: "change", when: "touched" });

    return { validate, requiredAtom };
  };

  return { validate, requiredAtom: defaultRequiredAtom, makeOptional };
}
