import {
  FieldAtom,
  FormAtom,
  FormFields,
  useForm,
  useFormActions,
} from "form-atoms";
import { useCallback, useMemo } from "react";
import { splitAtom } from "jotai/utils";
import { ListFields } from "./ListField";
import { PrimitiveAtom, atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomEffect } from "jotai-effect";

const getAt = (obj: Record<any, unknown>, path: (string | number)[]) =>
  // @ts-expect-error TODO recursive typing
  path.reduce((fields, key) => fields[key], obj);

// Possible extension:
// TODO value atom - walk fields
// TODO initialValue/dirty atom
// TODO error/validate atoms
const listFieldAtom = (listFields: ListFields) => {
  const valueAtom = atom(listFields);
  // @ts-ignore
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
  Item extends FieldAtom<any> | FormFields
>(
  form: FormAtom<Fields>,
  builder: () => Item,
  path: (string | number)[],
  keyExtractor: (item: Item) => string
) => {
  const { fieldAtoms } = useForm(form);
  const { updateFields } = useFormActions(form);

  // could be defined statically, will require changes in the core form-atoms api
  const listAtom = useMemo(
    () => listFieldAtom(getAt(fieldAtoms, path) as unknown as ListFields),
    []
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
          // @ts-ignore
          path.reduce((fields, key, index) => {
            if (index === path.length - 1) {
              // when a path key is the last, update the list reference
              // @ts-ignore
              fields[key] = arr;
            } else {
              // otherwise walk the path towards the list
              return fields[key];
            }
          }, fields);

          return fields;
        });
      }),
    []
  );

  useAtom(syncListEffect);

  const remove = useCallback(
    (atom: PrimitiveAtom<FieldAtom<any>> | PrimitiveAtom<FormFields>) => {
      console.log("remove", atom);
      // @ts-ignore TODO | FormFields?
      dispatch({ type: "remove", atom });
    },
    []
  );

  const add = useCallback(() => {
    // @ts-ignore
    dispatch({ type: "insert", value: builder() });
  }, []);

  const items = splitItems.map((item, index) => ({
    // @ts-ignore
    key: keyExtractor(value[index]!),
    fields: value[index]!,
    remove: () => remove(item),
  }));

  return { remove, add, isEmpty, items };
};
