import { FormAtom, UseFieldOptions, useFieldInitialValue } from "form-atoms";
import { PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useTransition } from "react";

import { ListAtomItems, ListAtomValue } from "../../atoms/list-atom";
import { ListField } from "../../fields";

export type ListItem<Fields extends ListAtomItems> = PrimitiveAtom<
  FormAtom<{
    fields: Fields;
  }>
>;

export const useListField = <
  Fields extends ListAtomItems,
  Value extends ListAtomValue<Fields>,
>(
  list: ListField<Fields, Value>,
  options?: UseFieldOptions<Value[]>,
) => {
  const atoms = useAtomValue(list);
  const validate = useSetAtom(atoms.validate, options);
  const [splitItems, dispatch] = useAtom(atoms._splitList);
  const formList = useAtomValue(atoms._formList);
  const formFields = useAtomValue(atoms._formFields);
  const isEmpty = useAtomValue(atoms.empty);
  const [, startTransition] = useTransition();
  useFieldInitialValue(list, options?.initialValue, options);

  const remove = useCallback((item: ListItem<Fields>) => {
    dispatch({ type: "remove", atom: item });
    startTransition(() => {
      validate("change");
    });
  }, []);

  const add = useCallback((before?: ListItem<Fields>) => {
    dispatch({ type: "insert", value: atoms.buildItem(), before });
    startTransition(() => {
      validate("change");
    });
  }, []);

  const move = useCallback(
    (item: ListItem<Fields>, before?: ListItem<Fields>) => {
      dispatch({ type: "move", atom: item, before });
    },
    [],
  );

  const items = splitItems.map((item, index) => ({
    item,
    key: `${formList[index]}`,
    fields: formFields[index]!,
    remove: () => remove(item),
    moveUp: () => move(item, splitItems[index - 1]),
    moveDown: () => move(item, splitItems[index + 2]),
  }));

  return { remove, add, move, isEmpty, items };
};
