import { FieldAtom, FormFieldValues, FormFields } from "form-atoms";

type EmptyValues<Fields extends FormFields> = {
  [Key in keyof Fields]: Fields[Key] extends FieldAtom<any>
    ? undefined
    : Fields[Key] extends FormFields
      ? EmptyValues<Fields[Key]>
      : Fields[Key] extends Array<infer Item>
        ? Item extends FieldAtom<any>
          ? undefined[]
          : Item extends FormFields
            ? EmptyValues<Item>[]
            : never
        : never;
};

export type ListFieldItems = FieldAtom<any> | FormFields;

export type ListFieldValues<T> = T extends FieldAtom<infer Value>
  ? Value | undefined // also empty
  : T extends FormFields
    ? FormFieldValues<T> | EmptyValues<T>
    : never;

// actual type must be one of overloads, as this one is ignored
export function listFieldBuilder<
  Fields extends ListFieldItems,
  /**
   * HACK
   * Having the Values computed in generic argument,
   * fixes the return types **when the argument to builder is used**.
   */
  Values extends ListFieldValues<Fields>,
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
  function buildFields(data: ListFieldValues<Fields>[]): Fields[];
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
