import { FieldAtom, FieldAtomConfig, fieldAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { Atom, Getter, WritableAtom, atom } from "jotai";
import { RESET, atomWithReset } from "jotai/utils";
import { z } from "zod";

type ValidationConfig = {
  optional?: boolean;
  schema: z.Schema | ((get: Getter) => z.Schema);
  optionalSchema?: z.Schema | ((get: Getter) => z.Schema);
};

export type ValidatedFieldAtomConfig<Value> = FieldAtomConfig<Value> &
  ValidationConfig;

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

export const validatedFieldAtom = <Value>({
  optional = false, // all fields required similarly as zod is required by default
  schema,
  optionalSchema,
  ...atomConfig
}: ValidatedFieldAtomConfig<Value>): ValidatedFieldAtom<Value> => {
  const requiredAtom = atomWithReset(!optional);

  const baseFieldAtom = fieldAtom({
    validate: zodValidate(
      (get) => {
        const required = get(requiredAtom);
        const schemaObj = typeof schema === "function" ? schema(get) : schema;
        const optionalSchemaObj =
          typeof optionalSchema === "function"
            ? optionalSchema(get)
            : optionalSchema ?? schemaObj; // fallback to schema when optional not customized

        return required ? schemaObj : optionalSchemaObj.optional();
      },
      {
        on: "change",
      }
    ),
    ...atomConfig,
  });

  const validatedAtom = atom((get) => {
    const baseField = get(baseFieldAtom);

    baseField.value.debugLabel = `field/value/${atomConfig.name}`;
    baseField.validateStatus.debugLabel = `field/validateStatus/${atomConfig.name}`;
    baseField.dirty.debugLabel = `field/dirty/${atomConfig.name}`;
    baseField.touched.debugLabel = `field/touched/${atomConfig.name}`;
    baseField.name.debugLabel = `field/name/${atomConfig.name}`;
    baseField.errors.debugLabel = `field/errors/${atomConfig.name}`;
    requiredAtom.debugLabel = `field/required/${atomConfig.name}`;

    return { ...baseField, required: requiredAtom };
  });

  validatedAtom.debugLabel = `field/${atomConfig.name}`;
  return validatedAtom;
};
