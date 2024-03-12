import { ListAtom, ListAtomConfig, listAtom } from "@form-atoms/list-atom";
import { FormFieldValues, FormFields } from "form-atoms";
import { Atom } from "jotai";
import { ZodAny, ZodArray, z } from "zod";

import { extendAtom } from "../../atoms/extendAtom";
import { FormFieldSubmitValues } from "../../components";
import { UserValidateConfig, prepareSchema } from "../../utils";
import {
  DefaultRequiredAtom,
  ReadRequired,
  WritableRequiredAtom,
  schemaValidate,
} from "../../utils/schemaValidate";
import { ZodParams, defaultParams } from "../zod-field";

export type ExtendListAtom<Fields extends FormFields, Value, State> =
  ListAtom<Fields, Value> extends Atom<infer DefaultState>
    ? Atom<DefaultState & State>
    : never;

export type ListField<
  Fields extends FormFields,
  Value,
  RequiredAtom = DefaultRequiredAtom,
> = ExtendListAtom<Fields, Value, { required: RequiredAtom }> & {
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
  FormFieldValues<Fields>,
  WritableRequiredAtom
>;

type ListFieldConfig<Fields extends FormFields, Value> = ListAtomConfig<
  Fields,
  Value
> &
  ZodParams &
  UserValidateConfig<ZodArray<ZodAny, "atleastone">, ZodArray<ZodAny, "many">>;

export const listField = <Fields extends FormFields, Value>({
  required_error = defaultParams.required_error,
  schema,
  optionalSchema,
  ...config
}: ListFieldConfig<Fields, Value>) => {
  const { validate, requiredAtom, makeOptional } = schemaValidate(
    prepareSchema({
      initial: {
        schema: z.array(z.any()).nonempty(required_error),
        optionalSchema: z.array(z.any()),
      },
      user: { schema, optionalSchema },
    }),
  );

  const listFieldAtom = extendAtom(
    listAtom({ ...config, validate }) as any,
    () => ({
      required: requiredAtom,
    }),
  ) as unknown as RequiredListField<Fields>;

  listFieldAtom.optional = (readRequired: ReadRequired = () => false) => {
    const { validate, requiredAtom } = makeOptional(readRequired);

    const optionalZodFieldAtom = extendAtom(
      listAtom({ ...config, validate }) as any,
      () => ({ required: requiredAtom }),
    ) as unknown as OptionalListField<Fields>;

    optionalZodFieldAtom.optional = () => optionalZodFieldAtom;

    return optionalZodFieldAtom;
  };

  return listFieldAtom;
};
