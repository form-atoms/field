import {
  FieldAtomConfig,
  FormAtom,
  ValidateOn,
  ValidateStatus,
  formAtom,
} from "form-atoms";
import { Atom, PrimitiveAtom, WritableAtom, atom } from "jotai";
import { RESET, atomWithReset, splitAtom } from "jotai/utils";

import {
  type ListFieldItems,
  type ListFieldValues,
  listFieldBuilder,
} from "./listFieldBuilder";
import { ExtendFieldAtom } from "../zod-field";

// copied from jotai/utils
type SplitAtomAction<Item> =
  | {
      type: "remove";
      atom: PrimitiveAtom<Item>;
    }
  | {
      type: "insert";
      value: Item;
      before?: PrimitiveAtom<Item>;
    }
  | {
      type: "move";
      atom: PrimitiveAtom<Item>;
      before?: PrimitiveAtom<Item>;
    };

export type ListField<
  Fields extends ListFieldItems,
  Values extends ListFieldValues<Fields>,
> = ExtendFieldAtom<
  Values[],
  {
    empty: Atom<boolean>;
    buildItem(): FormAtom<{
      fields: Fields;
    }>;
    _formFields: Atom<Fields[]>;
    _formList: PrimitiveAtom<
      FormAtom<{
        fields: Fields;
      }>[]
    >;
    /**
     * A splitAtom() managing adding, removing and moving items in the list.
     */
    _splitList: WritableAtom<
      PrimitiveAtom<
        FormAtom<{
          fields: Fields;
        }>
      >[],
      [
        SplitAtomAction<
          FormAtom<{
            fields: Fields;
          }>
        >,
      ],
      void
    >;
  }
>;

export const listField = <
  Fields extends ListFieldItems,
  Value extends ListFieldValues<Fields>,
>(
  config: {
    builder: (value: Value) => Fields;
  } & Pick<FieldAtomConfig<Value[]>, "name" | "validate" | "value">,
): ListField<Fields, Value> => {
  const nameAtom = atomWithReset(config.name);
  const initialValueAtom = atomWithReset<Value | undefined>(undefined);

  const formBuilder = listFieldBuilder(config.builder);

  function buildItem(): FormAtom<{
    fields: Fields;
  }> {
    return formAtom({ fields: formBuilder() });
  }

  const _formListAtom = atomWithReset(
    formBuilder(config.value).map((fields) => formAtom({ fields })),
  );
  const _splitListAtom = splitAtom(_formListAtom);

  /**
   * Unwraps the list of formAtoms, into list of fields of each form.
   */
  const _formFieldsAtom = atom((get) => {
    const formLists = get(_formListAtom);

    return formLists.map((formAtom) => {
      const formAtoms = get(formAtom);

      const { fields } = get(formAtoms.fields);

      return fields;
    });
  });

  const touchedAtom = atomWithReset(false);
  const dirtyAtom = atom(false);
  const errorsAtom = atom<string[]>([]);
  const validateCountAtom = atom(0);
  const validateResultAtom = atom<ValidateStatus>("valid");
  const refAtom = atom<HTMLFieldSetElement | null>(null);
  const emptyAtom = atom((get) => get(_formListAtom).length === 0);
  const valueAtom = atom(
    (get) => {
      const formLists = get(_formListAtom);

      return formLists.map((formAtom) => {
        const formAtoms = get(formAtom);
        const { fields } = get(formAtoms.values);

        return fields as Value;
      });
    },
    (
      _get,
      set,
      value: Value[] | typeof RESET | ((prev: Value[]) => Value[]), // the function is here just to match the type of FieldAtom!
    ) => {
      if (value === RESET) {
        set(_formListAtom, value);
      } else if (Array.isArray(value)) {
        set(
          _formListAtom,
          formBuilder(value).map((fields) => formAtom({ fields })),
        );
      } else {
        throw Error("Writing unsupported value to listFieldAtom value!");
      }
    },
  );

  const resetAtom = atom<null, [void], void>(null, (get, set) => {
    set(errorsAtom, []);
    set(touchedAtom, RESET);
    set(valueAtom, get(initialValueAtom) ?? RESET);

    // Need to set a new pointer to prevent stale validation results
    // from being set to state after this invocation.
    set(validateCountAtom, (count) => ++count);
    set(validateResultAtom, "valid");
  });

  const validateAtom = atom<null, [] | [ValidateOn], void>(
    null,
    (get, set, event = "user") => {
      async function resolveErrors() {
        if (!event) return;
        // This pointer prevents a stale validation result from being
        // set to state after the most recent invocation of validate.
        const ptr = get(validateCountAtom) + 1;
        set(validateCountAtom, ptr);
        const dirty = get(dirtyAtom);
        const value = get(valueAtom);

        if (event === "user" || event === "submit") {
          set(touchedAtom, true);
        }

        let errors: string[] = [];

        const maybeValidatePromise = config.validate?.({
          get,
          dirty,
          touched: get(touchedAtom),
          value,
          event: event,
        });

        if (isPromise(maybeValidatePromise)) {
          ptr === get(validateCountAtom) &&
            set(validateResultAtom, "validating");
          errors = (await maybeValidatePromise) ?? get(errorsAtom);
        } else {
          errors = maybeValidatePromise ?? get(errorsAtom);
        }

        if (ptr === get(validateCountAtom)) {
          set(errorsAtom, errors);
          set(validateResultAtom, errors.length > 0 ? "invalid" : "valid");
        }
      }

      resolveErrors();
    },
  );

  const listAtoms = {
    name: nameAtom,
    value: valueAtom,
    empty: emptyAtom,
    validateStatus: validateResultAtom,
    touched: touchedAtom,
    dirty: dirtyAtom,
    errors: errorsAtom,
    reset: resetAtom,
    validate: validateAtom,
    ref: refAtom,
    buildItem,
    _validateCount: validateCountAtom,

    /**
     * List private atoms
     */
    _splitList: _splitListAtom,
    _formList: _formListAtom,
    _formFields: _formFieldsAtom,
    _initialValue: initialValueAtom,
  };

  // @ts-expect-error ref with HTMLFieldset is ok
  return atom(listAtoms);
};

function isPromise(value: any): value is Promise<any> {
  return typeof value === "object" && typeof value.then === "function";
}
