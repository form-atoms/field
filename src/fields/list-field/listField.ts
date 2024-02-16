import { Atom } from "jotai";
import { ZodAny, ZodArray, z } from "zod";

import { extendFieldAtom } from "../../atoms/extendFieldAtom";
import {
  ListAtom,
  ListAtomConfig,
  ListAtomItems,
  ListAtomSubmitValue,
  ListAtomValue,
  listAtom,
} from "../../atoms/list-atom";
import {
  ReadRequired,
  ValidateConfig,
  WritableRequiredAtom,
  schemaValidate,
} from "../../atoms/schemaValidate";
import { ZodParams, defaultParams } from "../zod-field";

export type ExtendListAtom<
  Fields extends ListAtomItems,
  Value extends ListAtomValue<Fields>,
  State,
> =
  ListAtom<Fields, Value> extends Atom<infer DefaultState>
    ? Atom<DefaultState & State>
    : never;

export type ListField<
  Fields extends ListAtomItems,
  Value extends ListAtomValue<Fields>,
  RequiredAtom = Atom<boolean>,
> = ExtendListAtom<Fields, Value, { required: RequiredAtom }> & {
  optional: (readRequired?: ReadRequired) => OptionalListField<Fields>;
};

export type ListFieldSubmitValue<
  Fields extends ListAtomItems,
  Required,
> = Required extends WritableRequiredAtom
  ? ListAtomSubmitValue<Fields>[]
  : Required extends Atom<boolean>
    ? [ListAtomSubmitValue<Fields>, ...ListAtomSubmitValue<Fields>[]]
    : never;

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
  required_error = defaultParams.required_error,
  schema,
  optionalSchema,
  ...config
}: ListAtomConfig<Fields, Value> &
  ZodParams &
  Partial<
    ValidateConfig<ZodArray<ZodAny, "atleastone">, ZodArray<ZodAny, "many">>
  >) => {
  const { validate, requiredAtom, makeOptional } = schemaValidate({
    schema: schema ?? z.array(z.any()).nonempty(required_error),
    optionalSchema: optionalSchema ?? z.array(z.any()),
  });

  const listFieldAtom = extendFieldAtom(
    listAtom({ ...config, validate }),
    () => ({
      required: requiredAtom,
    }),
  ) as unknown as RequiredListField<Fields>;

  listFieldAtom.optional = (readRequired: ReadRequired = () => false) => {
    const { validate, requiredAtom } = makeOptional(readRequired);

    const optionalZodFieldAtom = extendFieldAtom(
      listAtom({ ...config, validate }),
      () => ({ required: requiredAtom }),
    ) as unknown as OptionalListField<Fields>;

    optionalZodFieldAtom.optional = () => optionalZodFieldAtom;

    return optionalZodFieldAtom;
  };

  return listFieldAtom;
};
