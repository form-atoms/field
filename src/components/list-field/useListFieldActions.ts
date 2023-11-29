import {
  FieldAtom,
  FormAtom,
  FormFields,
  useForm,
  useFormActions,
} from "form-atoms";
import { PrimitiveAtom, atom, useAtom, useAtomValue } from "jotai";
import { splitAtom } from "jotai/utils";
import { atomEffect } from "jotai-effect";
import { useCallback, useMemo } from "react";

import { ListFields } from "./ListField";

const getAt = (obj: Record<any, unknown>, path: (string | number)[]) =>
  // @ts-expect-error TODO recursive typing
  path.reduce((fields, key) => fields[key], obj);

// Possible extension:
// TODO value atom - walk fields
// TODO initialValue/dirty atom
// TODO error/validate atoms
const listFieldAtom = (listFields: ListFields) => {
  const valueAtom = atom(listFields);
  // @ts-expect-error ???
  const splitListAtom = splitAtom(valueAtom);
  const emptyAtom = atom((get) => get(valueAtom).length === 0);

  const list = {
    value: valueAtom,
    splitList: splitListAtom,
    empty: emptyAtom,
  };

  return atom(list);
};

export const useListFieldActions = <
  Fields extends FormFields,
  Item extends FieldAtom<any> | FormFields,
>(
  form: FormAtom<Fields>,
  builder: () => Item,
  path: (string | number)[],
  keyExtractor: (item: Item) => string,
) => {
  const { fieldAtoms } = useForm(form);
  const { updateFields } = useFormActions(form);

  // could be defined statically, will require changes in the core form-atoms api
  const listAtom = useMemo(
    () => listFieldAtom(getAt(fieldAtoms, path) as unknown as ListFields),
    [],
  );

  const list = useAtomValue(listAtom);
  const [splitItems, dispatch] = useAtom(list.splitList);
  const isEmpty = useAtomValue(list.empty);
  const value = useAtomValue(list.value);

  const syncListEffect = useMemo(
    () =>
      atomEffect((get) => {
        const arr = get(list.value);

        updateFields((fields) => {
          // @ts-expect-error traverse
          path.reduce((fields, key, index) => {
            if (index === path.length - 1) {
              // when a path key is the last, update the list reference
              // @ts-expect-error traverse
              fields[key] = arr;
            } else {
              // otherwise walk the path towards the list
              return fields[key];
            }
          }, fields);

          return { ...fields };
        });
      }),
    [],
  );

  useAtom(syncListEffect);

  const remove = useCallback((atom: PrimitiveAtom<Item>) => {
    // @ts-expect-error traverses anything TODO | FormFields?
    dispatch({ type: "remove", atom });
  }, []);

  const add = useCallback((before?: PrimitiveAtom<Item>) => {
    // @ts-expect-error traverses anything
    dispatch({ type: "insert", value: builder(), before });
  }, []);

  const move = useCallback(
    (atom: PrimitiveAtom<Item>, before?: PrimitiveAtom<Item>) => {
      // @ts-expect-error traverses anything
      dispatch({ type: "move", atom, before });
    },
    [],
  );

  const items = splitItems.map((atom, index) => ({
    atom,
    // @ts-expect-error traverses anything
    key: keyExtractor(value[index]!),
    fields: value[index]!,
    // @ts-expect-error traverses anything
    remove: () => remove(atom),
    // @ts-expect-error traverses anything
    moveUp: () => move(atom, splitItems[index - 1]),
    // @ts-expect-error traverses anything
    moveDown: () => move(atom, splitItems[index + 2]),
  }));

  return { remove, add, move, isEmpty, items };
};
