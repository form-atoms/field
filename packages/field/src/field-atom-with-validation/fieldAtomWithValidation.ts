import { FieldAtom, fieldAtom, FieldAtomConfig } from "form-atoms";
import { zodValidate } from "form-atoms/zod";
import { Atom, atom, useAtomValue, WritableAtom, Getter } from "jotai";
import { atomWithReset, RESET } from "jotai/utils";
import { useMemo } from "react";
import { z } from "zod";

type ValidationConfig = {
  optional?: boolean;
  schema: z.Schema | ((get: Getter) => z.Schema);
};

export type FieldAtomWithValidationConfig<Value> = FieldAtomConfig<Value> &
  ValidationConfig;

type FieldAtomWithValidation<Value> = FieldAtom<Value> extends Atom<infer R>
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

export const fieldAtomWithValidation = <Value>({
  optional = false, // all fields required similarly as zod is required by default
  schema,
  ...atomConfig
}: FieldAtomWithValidationConfig<Value>): FieldAtomWithValidation<Value> => {
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

export const useFieldRequiredProps = <Value>(
  fieldAtom: FieldAtomWithValidation<Value>
) => {
  const field = useAtomValue(fieldAtom);
  const required = useAtomValue(field.required);

  return useMemo(() => ({ required, "aria-required": required }), [required]);
};
