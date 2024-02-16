import {
  FieldAtomConfig,
  Validate,
  ValidateOn,
  ValidateStatus,
  walkFields,
} from "form-atoms";
import { Atom, PrimitiveAtom, SetStateAction, WritableAtom, atom } from "jotai";
import { RESET, atomWithDefault, atomWithReset, splitAtom } from "jotai/utils";

import {
  type ListAtomItems,
  type ListAtomValue,
  listBuilder,
} from "./listBuilder";
import { ListItemForm, listItemForm } from "./listItemForm";
import { ExtendFieldAtom } from "../extendFieldAtom";

export type ListItem<Fields extends ListAtomItems> = PrimitiveAtom<
  ListItemForm<Fields>
>;

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

export type ListAtom<
  Fields extends ListAtomItems,
  Value extends ListAtomValue<Fields>,
> = ExtendFieldAtom<
  Value[],
  {
    empty: Atom<boolean>;
    buildItem(): ListItemForm<Fields>;
    _formFields: Atom<Fields[]>;
    _formList: WritableAtom<
      ListItemForm<Fields>[],
      [typeof RESET | SetStateAction<ListItemForm<Fields>[]>],
      void
    >;

    /**
     * A splitAtom() managing adding, removing and moving items in the list.
     */
    _splitList: WritableAtom<
      PrimitiveAtom<ListItemForm<Fields>>[],
      [SplitAtomAction<ListItemForm<Fields>>],
      void
    >;
  }
>;

export type ListAtomConfig<
  Fields extends ListAtomItems,
  Value extends ListAtomValue<Fields>,
> = {
  /**
   * The item builder expects a pure function creating the form fields to be used for each item.
   * @param value The item value.
   * @returns The item fields.
   */
  builder: (value: Value) => Fields;
  /**
   * Error message the listAtom will have, when the its items have nested errors.
   */
  invalidItemError?: string;
} & Pick<FieldAtomConfig<Value[]>, "name" | "validate" | "value">;

/**
 * @private
 */
export function listAtom<
  Fields extends ListAtomItems,
  Value extends ListAtomValue<Fields>,
>(config: ListAtomConfig<Fields, Value>): ListAtom<Fields, Value> {
  const nameAtom = atomWithReset(config.name);
  const initialValueAtom = atomWithReset<Value | undefined>(undefined);

  const formBuilder = listBuilder(config.builder);

  function buildItem(): ListItemForm<Fields> {
    return listItemForm({
      fields: formBuilder(),
      getListNameAtom: (get) => get(self).name,
      formListAtom: _formListAtom,
    });
  }

  const makeFormList = (): ListItemForm<Fields>[] =>
    formBuilder(config.value).map((fields) =>
      listItemForm({
        fields,
        getListNameAtom: (get) => get(self).name,
        formListAtom: _formListAtom,
      }),
    );

  const initialFormListAtom = atomWithDefault(makeFormList);
  const _formListAtom = atomWithDefault((get) => get(initialFormListAtom));
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
  const dirtyAtom = atom((get) => {
    const listUpdated = !arraysShallowEqual(
      get(initialFormListAtom),
      get(_formListAtom),
    );

    if (listUpdated) {
      // early return
      return listUpdated;
    }

    const hasNestedDirtyField = get(_formListAtom)
      .map((formAtom) => {
        const form = get(formAtom);
        let dirty = false;

        walkFields(get(form.fields), (fieldAtom) => {
          const field = get(fieldAtom);

          if (get(field.dirty)) {
            dirty = true;
            return false;
          }
        });

        return dirty;
      })
      .some((dirty) => dirty);

    return hasNestedDirtyField;
  });
  const listErrorsAtom = atom<string[]>([]);
  const itemErrorsAtom = atom((get) => {
    // get errors from the nested forms
    const hasInvalidForm = get(_formListAtom)
      .map((formAtom) => {
        const form = get(formAtom);
        let invalid = false;

        walkFields(get(form.fields), (field) => {
          const atoms = get(field);
          const errors = get(atoms.errors);

          if (errors.length) {
            invalid = true;
            return false;
          }
        });

        return invalid;
      })
      .some((invalid) => invalid);

    return hasInvalidForm
      ? [config.invalidItemError ?? "Some list items contain errors."]
      : [];
  });
  const errorsAtom = atom(
    (get) => [...get(listErrorsAtom), ...get(itemErrorsAtom)],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_get, _set, _value: string[]) => {
      // intentional NO-OP
      // the errors atom must be writable, as the `validateAtom` will write the errors returned from `_validateCallback`
      // but we ignore it, as we already manage the `listErrors` internally
    },
  );

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
      get,
      set,
      value: Value[] | typeof RESET | ((prev: Value[]) => Value[]), // the function is here just to match the type of FieldAtom!
    ) => {
      if (value === RESET) {
        set(_formListAtom, value);
        set(initialFormListAtom, value);

        const forms = get(_formListAtom);

        for (const form of forms) {
          const { reset } = get(form);
          set(reset);
        }
      } else if (Array.isArray(value)) {
        const updatedFormList = formBuilder(value).map((fields) =>
          listItemForm({
            fields,
            getListNameAtom: (get) => get(self).name,
            formListAtom: _formListAtom,
          }),
        );
        set(initialFormListAtom, updatedFormList);
        set(_formListAtom, updatedFormList);
      } else {
        throw Error("Writing unsupported value to listFieldAtom value!");
      }
    },
  );

  const resetAtom = atom<null, [void], void>(null, (get, set) => {
    set(errorsAtom, []);
    set(listErrorsAtom, []);
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

        // run validation for nested forms
        await Promise.all(
          get(_formListAtom).map((formAtom) =>
            get(formAtom)._validateFields(get, set, event),
          ),
        );

        let errors: string[] = [];

        const maybeValidatePromise = config.validate?.({
          get,
          set,
          dirty,
          touched: get(touchedAtom),
          value,
          event: event,
        });

        if (isPromise(maybeValidatePromise)) {
          ptr === get(validateCountAtom) &&
            set(validateResultAtom, "validating");
          errors = (await maybeValidatePromise) ?? get(listErrorsAtom);
        } else {
          errors = maybeValidatePromise ?? get(listErrorsAtom);
        }

        if (ptr === get(validateCountAtom)) {
          set(listErrorsAtom, errors);
          set(validateResultAtom, errors.length > 0 ? "invalid" : "valid");
        }
      }

      resolveErrors();
    },
  );

  const validateCallback: Validate<Value> = async (state) => {
    // run validation for nested forms
    await Promise.all(
      state
        .get(_formListAtom)
        .map((formAtom) =>
          state
            .get(formAtom)
            ._validateFields(state.get, state.set, state.event),
        ),
    );

    // validate the listAtom itself
    const listValidate = config.validate?.(state);
    const listError = isPromise(listValidate)
      ? await listValidate
      : listValidate;

    state.set(listErrorsAtom, listError ?? []);

    return state.get(errorsAtom);
  };

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
    _validateCallback: validateCallback,
    /**
     * List private atoms
     */
    _splitList: _splitListAtom,
    _formList: _formListAtom,
    _formFields: _formFieldsAtom,
    _initialValue: initialValueAtom,
  };

  const self = atom(listAtoms);

  // @ts-expect-error ref with HTMLFieldset is ok
  return self;
}

function isPromise(value: any): value is Promise<any> {
  return typeof value === "object" && typeof value.then === "function";
}

function arraysShallowEqual(a: unknown[], b: unknown[]) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((v, i) => Object.is(v, b[i]));
  }
  return false;
}
