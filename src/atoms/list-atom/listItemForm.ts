import {
  FormAtom,
  FormFieldErrors,
  FormFieldValues,
  FormFields,
  RESET,
  SubmitStatus,
  TouchedFields,
  ValidateOn,
  ValidateStatus,
  formAtom,
  walkFields,
} from "form-atoms";
import {
  Atom,
  Getter,
  SetStateAction,
  Setter,
  WritableAtom,
  atom,
} from "jotai";
import { atomEffect } from "jotai-effect";

import { ListAtomItems } from "./listBuilder";
import { extendFieldAtom } from "../extendFieldAtom";

export type ExtendFormAtom<Fields extends FormFields, State> =
  FormAtom<Fields> extends Atom<infer DefaultState>
    ? Atom<DefaultState & State>
    : never;

// TODO(types): ExtendFormAtom does not work
// The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.
type NamedFormAtom<Fields extends FormFields> = Atom<{
  nameAtom: Atom<string>;

  /**
   * An atom containing an object of nested field atoms
   */
  fields: WritableAtom<
    Fields,
    [Fields | typeof RESET | ((prev: Fields) => Fields)],
    void
  >;
  /**
   * An read-only atom that derives the form's values from
   * its nested field atoms.
   */
  values: Atom<FormFieldValues<Fields>>;
  /**
   * An read-only atom that derives the form's errors from
   * its nested field atoms.
   */
  errors: Atom<FormFieldErrors<Fields>>;
  /**
   * A read-only atom that returns `true` if any of the fields in
   * the form are dirty.
   */
  dirty: Atom<boolean>;
  /**
   * A read-only atom derives the touched state of its nested field atoms.
   */
  touchedFields: Atom<TouchedFields<Fields>>;
  /**
   * A write-only atom that resets the form's nested field atoms
   */
  reset: WritableAtom<null, [], void>;
  /**
   * A write-only atom that validates the form's nested field atoms
   */
  validate: WritableAtom<null, [] | [ValidateOn], void>;
  /**
   * A read-only atom that derives the form's validation status
   */
  validateStatus: Atom<ValidateStatus>;
  /**
   * A write-only atom for submitting the form
   */
  submit: WritableAtom<
    null,
    [(value: FormFieldValues<Fields>) => void | Promise<void>],
    void
  >;
  /**
   * A read-only atom that reads the number of times the form has
   * been submitted
   */
  submitCount: Atom<number>;
  /**
   * An atom that contains the form's submission status
   */
  submitStatus: WritableAtom<SubmitStatus, [SubmitStatus], void>;
  _validateFields: (
    get: Getter,
    set: Setter,
    event: ValidateOn,
  ) => Promise<void>;
}>;

export type ListItemForm<Fields extends ListAtomItems> = NamedFormAtom<{
  fields: Fields;
}>;

// export type ListItemForm<Fields extends ListAtomItems> = ExtendFormAtom<
//   {
//     fields: Fields;
//   },
//   {
//     nameAtom: Atom<string>;
//   }
// >;

export function listItemForm<Fields extends ListAtomItems>({
  fields,
  formListAtom,
  getListNameAtom,
}: {
  /**
   * The fields of the item form.
   */
  fields: Fields;
  /**
   * The atom where this list item will be stored.
   */
  formListAtom: WritableAtom<
    ListItemForm<Fields>[],
    [typeof RESET | SetStateAction<ListItemForm<Fields>[]>],
    void
  >;
  /**
   * The nameAtom of the parent listAtom.
   */
  getListNameAtom: (
    get: Getter,
  ) =>
    | Atom<string>
    | WritableAtom<
        string | undefined,
        [string | undefined | typeof RESET],
        void
      >;
}) {
  const itemFormAtom: ListItemForm<Fields> = extendFieldAtom(
    formAtom({ fields }),
    (base, get) => {
      console.log("building itemFormAtom");
      const nameAtom = atom((get) => {
        const list: ListItemForm<Fields>[] = get(formListAtom);
        const listName = get(getListNameAtom(get));

        return `${listName ?? ""}[${list.indexOf(itemFormAtom)}]`;
      });

      const patchNamesEffect = atomEffect((get, set) => {
        const fields = get(base.fields);

        console.log("runs effect");

        walkFields(fields, (field) => {
          const { name: originalFieldNameAtom } = get(field);

          const scopedNameAtom = atom(
            (get) => {
              return [get(nameAtom), get(originalFieldNameAtom)]
                .filter(Boolean)
                .join(".");
            },
            (_, set, update: string) => {
              set(originalFieldNameAtom, update);
            },
          );

          // @ts-expect-error field is PrimitiveAtom
          set(field, { name: scopedNameAtom, originalFieldNameAtom });
        });

        return () => {
          walkFields(fields, (field) => {
            // @ts-expect-error oh yes
            const { originalFieldNameAtom } = get(field);

            // @ts-expect-error field is PrimitiveAtom
            set(field, {
              // drop the scopedNameAtom, as to not make it original on next mount
              name: originalFieldNameAtom,
              originalFieldNameAtom: undefined,
            });
          });
        };
      });

      get(patchNamesEffect); // subscribe

      return {
        name: nameAtom,
      };
    },
  );

  return itemFormAtom;
}
