import { FieldAtom, FormFieldValues, FormFields } from "form-atoms";

import { FormFieldSubmitValues } from "../../components/form";
import { ZodField, ZodFieldSubmitValue } from "../../fields";

export type ListAtomItems = FieldAtom<any> | FormFields;

export type ListAtomValue<T extends ListAtomItems> =
  T extends FieldAtom<infer Value>
    ? Value
    : T extends FormFields
      ? FormFieldValues<T>
      : never;

export type ListAtomSubmitValue<T extends ListAtomItems> = T extends ZodField
  ? ZodFieldSubmitValue<T>
  : T extends FormFields
    ? FormFieldSubmitValues<T>
    : never;

// actual type must be one of overloads, as this one is ignored
export function listBuilder<
  Fields extends ListAtomItems,
  /**
   * HACK
   * Having the Values computed in generic argument,
   * fixes the return types **when the argument to builder is used**.
   */
  Values extends ListAtomValue<Fields>,
>(builder: (value: Values) => Fields) {
  let emptyValue: undefined | Values = undefined;
  try {
    // test if builder is 'atomBuilder', e.g. returns plain atom
    // @ts-expect-error this is a test call
    builder(undefined);
  } catch {
    // builder is 'fieldsBuilder', e.g. it returns Record<string, fieldAtom>
    emptyValue = {} as Values;
  }

  function buildFields(): Fields;
  /**
   * @FIXME
   * HACK2:
   * the data is not simply Values, as that would produce the any[] on the returned function.
   */
  function buildFields(data: ListAtomValue<Fields>[]): Fields[];
  function buildFields(data?: Values[]) {
    if (data) {
      return data.map(builder);
    } else {
      // @ts-expect-error empty call
      return builder(emptyValue);
    }
  }

  return buildFields;
}
