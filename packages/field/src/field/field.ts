import { FieldAtom, FieldAtomConfig, fieldAtom } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { Atom, Getter, WritableAtom, atom } from "jotai";
import { RESET, atomWithReset } from "jotai/utils";
import { z } from "zod";

type ValidationConfig = {
  optional?: boolean;
  schema: z.Schema | ((get: Getter) => z.Schema);
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
  ...atomConfig
}: ValidatedFieldAtomConfig<Value>): ValidatedFieldAtom<Value> => {
  const requiredAtom = atomWithReset(!optional);

  const baseFieldAtom = fieldAtom({
    validate: zodValidate(
      (get) => {
        const required = get(requiredAtom);
        const schemaObj = typeof schema === "function" ? schema(get) : schema;

        return required ? schemaObj : schemaObj.optional();
      },
      {
        on: "change",
      }
    ),
    ...atomConfig,
  });

  return atom((get) => {
    const baseField = get(baseFieldAtom);

    return { ...baseField, required: requiredAtom };
  });
};
