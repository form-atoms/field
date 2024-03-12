import { RESET } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import type { Getter, WritableAtom } from "jotai";
import { atom } from "jotai";
import { atomWithDefault } from "jotai/utils";
import { ZodUndefined, z } from "zod";

export type ValidateConfig<
  Schema extends z.Schema,
  OptSchema extends z.Schema,
> = {
  schema: Schema | ((get: Getter) => Schema);
  optionalSchema?: OptSchema | ((get: Getter) => OptSchema);
};

export type DefaultRequiredAtom = typeof defaultRequiredAtom;
export type WritableRequiredAtom = WritableAtom<
  boolean,
  [boolean | typeof RESET | ((prev: boolean) => boolean)],
  void
>;
/**
 * Read-only atom for default zodFields which all are required.
 */
const defaultRequiredAtom = atom(() => true);
defaultRequiredAtom.debugLabel = "zodField/defaultRequired";

export type ReadRequired = Parameters<typeof atomWithDefault<boolean>>[0];

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

  const makeOptional = (readRequired: ReadRequired = () => false) => {
    const requiredAtom = atomWithDefault(readRequired);
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
