import { FieldAtom, FormFieldValues, FormFields } from "form-atoms";
import { ExtractAtomValue } from "jotai";

type FieldAtomValue<T extends FieldAtom<any>> = ExtractAtomValue<
  ExtractAtomValue<T>["value"]
>;

type ListFieldItems = FieldAtom<any> | FormFields;

type ListFieldValue<T extends ListFieldItems> = T extends FieldAtom<any>
  ? FieldAtomValue<T>
  : T extends FormFields
    ? FormFieldValues<T>
    : never;

// actual type must be one of overloads, as this one is ignored
export function listFieldBuilder<
  Fields extends ListFieldItems,
  Value = ListFieldValue<Fields>,
>(builder: (value: Value) => Fields) {
  let emptyValue: undefined | Value = undefined;
  try {
    // test if builder is 'atomBuilder', e.g. returns plain atom
    // @ts-expect-error this is a test call
    builder(undefined);
  } catch {
    // builder is 'fieldsBuilder', e.g. it returns Record<string, fieldAtom>
    emptyValue = {} as Value;
  }

  function buildFields(): Fields;
  function buildFields(data: ListFieldValue<Fields>[]): Fields[];
  function buildFields(data?: ListFieldValue<Fields>[]) {
    if (data) {
      return data.map(builder);
    } else {
      // @ts-expect-error empty call
      return builder(emptyValue);
    }
  }

  return buildFields;
}
