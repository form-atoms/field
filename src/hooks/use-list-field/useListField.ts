import { FormAtom } from "form-atoms";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";

import { ListField, ListFieldItems, ListFieldValues } from "../../fields";

export type ListItem<Fields extends ListFieldItems> = PrimitiveAtom<
  FormAtom<{
    fields: Fields;
  }>
>;

export const useListField = <
  Fields extends ListFieldItems,
  Values extends ListFieldValues<Fields>,
>(
  list: ListField<Fields, Values>,
) => {
  const atoms = useAtomValue(list);

  const [splitItems, dispatch] = useAtom(atoms._splitList);
  const formList = useAtomValue(atoms._formList);
  const formFields = useAtomValue(atoms._formFields);
  const isEmpty = useAtomValue(atoms.empty);

  const remove = useCallback((atom: ListItem<Fields>) => {
    dispatch({ type: "remove", atom });
  }, []);

  const add = useCallback((before?: ListItem<Fields>) => {
    dispatch({ type: "insert", value: atoms.buildItem(), before });
  }, []);

  const move = useCallback(
    (atom: ListItem<Fields>, before?: ListItem<Fields>) => {
      dispatch({ type: "move", atom, before });
    },
    [],
  );

  const items = splitItems.map((atom, index) => ({
    atom,
    key: `${formList[index]}`,
    fields: formFields[index]!,
    remove: () => remove(atom),
    moveUp: () => move(atom, splitItems[index - 1]),
    moveDown: () => move(atom, splitItems[index + 2]),
  }));

  return { remove, add, move, isEmpty, items };
};