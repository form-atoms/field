import {
  FieldAtomConfig,
  FormAtom,
  FormFields,
  Validate,
  ValidateOn,
  ValidateStatus,
  formAtom,
  walkFields,
} from "form-atoms";
import { Atom, Getter, PrimitiveAtom, Setter, WritableAtom, atom } from "jotai";
import { RESET, atomWithReset, splitAtom } from "jotai/utils";

import {
  type ListAtomItems,
  type ListAtomValue,
  listBuilder,
} from "./listBuilder";
import { ExtendFieldAtom } from "../extendFieldAtom";

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

/**
 * @private
 */
export function listAtom<
  Fields extends ListAtomItems,
  Value extends ListAtomValue<Fields>,
>(
  config: {
    builder: (value: Value) => Fields;
    invalidItemError?: string;
  } & Pick<FieldAtomConfig<Value[]>, "name" | "validate" | "value">,
): ListAtom<Fields, Value> {
  const nameAtom = atomWithReset(config.name);
  const initialValueAtom = atomWithReset<Value | undefined>(undefined);

  const formBuilder = listBuilder(config.builder);

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

        // does not work with async
        // state.get(form.validateStatus) === "invalid";
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
      // the errors atom must be writable, as the `validateAtoms` will write the errors returned from `_validateCallback`
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

        const forms = get(_formListAtom);

        for (const form of forms) {
          const { reset } = get(form);
          set(reset);
        }
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

  const validateCallback: Validate<Value> = async (state) => {
    // run validation for nested forms
    await Promise.all(
      state
        .get(_formListAtom)
        .map((formAtom) =>
          validateFormFields(
            formAtom as any,
            state.get,
            state.set,
            state.event,
          ),
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

  // @ts-expect-error ref with HTMLFieldset is ok
  return atom(listAtoms);
}

function isPromise(value: any): value is Promise<any> {
  return typeof value === "object" && typeof value.then === "function";
}

// TODO: reuse from formAtoms._validateFields
async function validateFormFields(
  formAtom: FormAtom<FormFields>,
  get: Getter,
  set: Setter,
  event: ValidateOn,
) {
  const form = get(formAtom);
  const fields = get(form.fields);
  const promises: Promise<boolean>[] = [];

  walkFields(fields, (nextField) => {
    async function validate(field: typeof nextField) {
      const fieldAtom = get(field);
      const value = get(fieldAtom.value);
      const dirty = get(fieldAtom.dirty);
      // This pointer prevents a stale validation result from being
      // set after the most recent validation has been performed.
      const ptr = get(fieldAtom._validateCount) + 1;
      set(fieldAtom._validateCount, ptr);

      if (event === "user" || event === "submit") {
        set(fieldAtom.touched, true);
      }

      const maybePromise = fieldAtom._validateCallback?.({
        get,
        set,
        value,
        dirty,
        touched: get(fieldAtom.touched),
        event,
      });

      let errors: string[];

      if (isPromise(maybePromise)) {
        set(fieldAtom.validateStatus, "validating");
        errors = (await maybePromise) ?? get(fieldAtom.errors);
      } else {
        errors = maybePromise ?? get(fieldAtom.errors);
      }

      if (ptr === get(fieldAtom._validateCount)) {
        set(fieldAtom.errors, errors);
        set(fieldAtom.validateStatus, errors.length > 0 ? "invalid" : "valid");
      }

      if (errors && errors.length) {
        return false;
      }

      return true;
    }

    promises.push(validate(nextField));
  });

  await Promise.all(promises);
}
