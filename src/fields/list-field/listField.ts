import { FieldAtomConfig } from "form-atoms";
import { Atom } from "jotai";
import { z } from "zod";

import { extendFieldAtom } from "../../atoms/extendFieldAtom";
import {
  ListAtom,
  ListAtomItems,
  ListAtomValue,
  listAtom,
} from "../../atoms/list-atom";
import {
  WritableRequiredAtom,
  schemaValidate,
} from "../../atoms/schemaValidate";
import { ZodParams } from "../zod-field";

export type ExtendListAtom<
  Fields extends ListAtomItems,
  Value extends ListAtomValue<Fields>,
  State,
> = ListAtom<Fields, Value> extends Atom<infer DefaultState>
  ? Atom<DefaultState & State>
  : never;

export type ListField<
  Fields extends ListAtomItems,
  Value extends ListAtomValue<Fields>,
  RequiredAtom = Atom<boolean>,
> = ExtendListAtom<Fields, Value, { required: RequiredAtom }> & {
  optional: (read?: Atom<boolean>["read"]) => OptionalListField<Fields>;
};

/**
 * This is an alias to ListField, it hides the 2nd and 3rd argument from type tooltip.
 */
type RequiredListField<Fields extends ListAtomItems> = ListField<
  Fields,
  ListAtomValue<Fields>
>;

export type OptionalListField<Fields extends ListAtomItems> = ListField<
  Fields,
  ListAtomValue<Fields>,
  WritableRequiredAtom
>;

export const listField = <
  Fields extends ListAtomItems,
  Value extends ListAtomValue<Fields>,
>({
  required_error,
  ...config
}: {
  builder: (value: Value) => Fields;
} & FieldAtomConfig<Value[]> &
  ZodParams) => {
  const { validate, requiredAtom, makeOptional } = schemaValidate({
    schema: z.array(z.number()).nonempty(required_error),
    optionalSchema: z.array(z.any()),
  });

  const listFieldAtom = extendFieldAtom(listAtom({ ...config, validate }), {
    required: requiredAtom,
  }) as unknown as RequiredListField<Fields>;

  listFieldAtom.optional = (
    readRequired: Atom<boolean>["read"] = () => false,
  ) => {
    const { validate, requiredAtom } = makeOptional(readRequired);

    const optionalZodFieldAtom = extendFieldAtom(
      listAtom({ ...config, validate }),
      { required: requiredAtom },
    ) as OptionalListField<Fields>;

    optionalZodFieldAtom.optional = () => optionalZodFieldAtom;

    return optionalZodFieldAtom;
  };

  return listFieldAtom;
};
