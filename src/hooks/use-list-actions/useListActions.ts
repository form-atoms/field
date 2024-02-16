import { UseFieldOptions } from "form-atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useTransition } from "react";

import {
  ListAtom,
  ListAtomItems,
  ListAtomValue,
  ListItem,
} from "../../atoms/list-atom";
import { listItemForm } from "../../atoms/list-atom/listItemForm";

export const useListActions = <
  Fields extends ListAtomItems,
  Value extends ListAtomValue<Fields>,
>(
  list: ListAtom<Fields, Value>,
  options?: UseFieldOptions<Value[]>,
) => {
  const atoms = useAtomValue(list);
  const validate = useSetAtom(atoms.validate, options);
  const dispatchSplitList = useSetAtom(atoms._splitList);
  const [, startTransition] = useTransition();

  const remove = useCallback((item: ListItem<Fields>) => {
    dispatchSplitList({ type: "remove", atom: item });
    startTransition(() => {
      validate("change");
    });
  }, []);

  const add = useCallback((before?: ListItem<Fields>, fields?: Fields) => {
    dispatchSplitList({
      type: "insert",
      value: fields
        ? listItemForm({
            fields,
            getListNameAtom: (get) => get(list).name,
            formListAtom: atoms._formList,
          })
        : atoms.buildItem(),
      before,
    });
    startTransition(() => {
      validate("change");
    });
  }, []);

  const move = useCallback(
    (item: ListItem<Fields>, before?: ListItem<Fields>) => {
      dispatchSplitList({ type: "move", atom: item, before });
    },
    [],
  );

  return { remove, add, move };
};
