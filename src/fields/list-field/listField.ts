import { ListAtom, ListAtomConfig, listAtom } from "@form-atoms/list-atom";
import type { FormFieldValues, FormFields } from "form-atoms";
import type { Atom } from "jotai";
import { type ZodArray, ZodObject, z } from "zod";

import { extendAtom } from "../../atoms/extendAtom";
import type { FormFieldSubmitValues } from "../../components";
import { UserValidateConfig, prepareSchema } from "../../utils";
import {
  DefaultRequiredAtom,
  ReadRequired,
  WritableRequiredAtom,
  schemaValidate,
} from "../../utils/schemaValidate";
import { ZodParams } from "../zod-field";

export type ExtendListAtom<Fields extends FormFields, State> =
  ListAtom<Fields> extends Atom<infer DefaultState>
    ? Atom<DefaultState & State>
    : never;

export type ListField<
  Fields extends FormFields,
  RequiredAtom = DefaultRequiredAtom,
> = ExtendListAtom<Fields, { required: RequiredAtom }> & {
  optional: (readRequired?: ReadRequired) => OptionalListField<Fields>;
};

export type ListFieldSubmitValue<
  Fields extends FormFields,
  Required,
> = Required extends WritableRequiredAtom
  ? FormFieldSubmitValues<Fields>[]
  : Required extends DefaultRequiredAtom
    ? [FormFieldSubmitValues<Fields>, ...FormFieldSubmitValues<Fields>[]]
    : never;

/**
 * This is an alias to ListField, it hides the 2nd and 3rd argument from type tooltip.
 */
type RequiredListField<Fields extends FormFields> = ListField<
  Fields,
  FormFieldValues<Fields>
>;

export type OptionalListField<Fields extends FormFields> = ListField<
  Fields,
  WritableRequiredAtom
>;

type ListFieldConfig<Fields extends FormFields> = ListAtomConfig<Fields> &
  ZodParams &
  UserValidateConfig<ZodArray<ZodObject>, ZodArray<ZodObject>>;

export const listField = <Fields extends FormFields>({
  required_error,
  schema,
  optionalSchema,
  ...config
}: ListFieldConfig<Fields>) => {
  const { validate, requiredAtom, makeOptional } = schemaValidate(
    prepareSchema({
      initial: {
        schema: z.array(z.object()).nonempty({ error: required_error }),
        optionalSchema: z.array(z.object()),
      },
      user: { schema, optionalSchema },
    }),
  );

  const listFieldAtom = extendAtom(listAtom({ ...config, validate }), () => ({
    required: requiredAtom,
  })) as unknown as RequiredListField<Fields>;

  listFieldAtom.optional = (readRequired: ReadRequired = () => false) => {
    const { validate, requiredAtom } = makeOptional(readRequired);

    const optionalZodFieldAtom = extendAtom(
      listAtom({ ...config, validate }),
      () => ({ required: requiredAtom }),
    ) as unknown as OptionalListField<Fields>;

    optionalZodFieldAtom.optional = () => optionalZodFieldAtom;

    return optionalZodFieldAtom;
  };

  return listFieldAtom;
};
