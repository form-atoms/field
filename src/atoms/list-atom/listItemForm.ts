import { FormAtom, FormFields, RESET, formAtom } from "form-atoms";
import { Atom, SetStateAction, WritableAtom, atom } from "jotai";

import { ListAtomItems } from "./listBuilder";
import { extendFieldAtom } from "../extendFieldAtom";

export type ExtendFormAtom<Fields extends FormFields, State> =
  FormAtom<Fields> extends Atom<infer DefaultState>
    ? Atom<DefaultState & State>
    : never;

export type ListItemForm<Fields extends ListAtomItems> = ExtendFormAtom<
  {
    fields: Fields;
  },
  {
    nameAtom: Atom<string>;
  }
>;

export function listItemForm<Fields extends ListAtomItems>({
  fields,
  formListAtom,
  listNameAtom,
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
  listNameAtom:
    | Atom<string>
    | WritableAtom<
        string | undefined,
        [string | undefined | typeof RESET],
        void
      >;
}) {
  const itemFormAtom: ListItemForm<Fields> = extendFieldAtom(
    formAtom({ fields }),
    () => ({
      nameAtom: atom((get) => {
        const list: ListItemForm<Fields>[] = get(formListAtom);
        const listName = get(listNameAtom);

        return `${listName ?? ""}[${list.indexOf(itemFormAtom)}]`;
      }),
    }),
  );

  return itemFormAtom;
}
