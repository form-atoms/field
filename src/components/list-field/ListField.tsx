import { FieldAtom, FormAtom, FormFields } from "form-atoms";
import { PrimitiveAtom } from "jotai";
import { Fragment, useCallback } from "react";
import { RenderProp } from "react-render-prop-type";

import { useListFieldActions } from "./useListFieldActions";

export type RemoveItemButtonProps = { remove: () => void };
export type RemoveItemButtonProp = RenderProp<
  RemoveItemButtonProps,
  "RemoveItemButton"
>;

export type AddItemButtonProps = { add: () => void };
export type AddItemButtonProp = RenderProp<AddItemButtonProps, "AddItemButton">;

export type EmptyMessageProp = RenderProp<unknown, "EmptyMessage">;

type RenderProps = Partial<
  RemoveItemButtonProp & AddItemButtonProp & EmptyMessageProp
>;

export type ListItemRenderProps<Fields> = RenderProp<
  {
    atom: PrimitiveAtom<Fields>;
    /**
     * The index of the current item.
     */
    index: number;
    /**
     * Total count of items in the list.
     */
    count: number;
    fields: Fields;
    add: (before?: PrimitiveAtom<Fields>) => void;
    remove: (field: FieldAtom<any> | FormFields) => void;
    moveUp: () => void;
    moveDown: () => void;
  } & RenderProp<unknown, "RemoveItemButton">
>;

export type ListFields = FieldAtom<any>[] | FormFields[];

type RecurrFormFields = FormFields | ListFields;

type ListFieldPropsRecurr<
  Fields extends RecurrFormFields,
  Path extends (string | number)[],
> = Path extends [
  infer P extends keyof Fields,
  ...infer R extends (string | number)[],
]
  ? Fields[P] extends RecurrFormFields
    ? ListFieldPropsRecurr<Fields[P], R>
    : never
  : {
      builder: () => Fields extends (infer Item extends
        | FieldAtom<any>
        | FormFields)[]
        ? Item
        : never;
    } & (Fields extends (infer F extends FormFields)[]
      ? { keyFrom: keyof F }
      : // key not needed for FieldAtom<any>[], atom itself will be key
        { keyFrom?: never }) &
      ListItemRenderProps<
        Fields extends (infer Item extends FieldAtom<any> | FormFields)[]
          ? Item
          : never
      >;

export type ListFieldProps<
  Fields extends FormFields,
  Path extends (string | number)[],
> = RenderProps &
  (Path extends [
    infer P extends keyof Fields,
    ...infer Rest extends (string | number)[],
  ]
    ? Fields[P] extends RecurrFormFields
      ? { form: FormAtom<Fields>; path: Path } & ListFieldPropsRecurr<
          Fields[P],
          Rest
        >
      : never
    : never);

export function ListField<
  Fields extends FormFields,
  Path extends (string | number)[],
>({
  path,
  form,
  builder,
  keyFrom,
  children,
  RemoveItemButton = ({ remove }) => (
    <button type="button" onClick={remove}>
      Remove
    </button>
  ),
  AddItemButton = ({ add }) => (
    <button type="button" onClick={add}>
      Add item
    </button>
  ),
  EmptyMessage,
}: ListFieldProps<Fields, Path>) {
  const keyExtractor = useCallback(
    (fields: FieldAtom<any> | FormFields) => {
      if (typeof keyFrom === "string" && keyFrom in fields) {
        // @ts-expect-error atoms have toString()
        return `${fields[keyFrom]}`;
      } else {
        return `${fields}`;
      }
    },
    [keyFrom],
  );

  const { add, isEmpty, items } = useListFieldActions(
    form,
    builder,
    path,
    keyExtractor,
  );

  return (
    <>
      {isEmpty && EmptyMessage ? <EmptyMessage /> : undefined}
      {items.map(({ remove, fields, key, atom, moveUp, moveDown }, index) => (
        <Fragment key={key}>
          {children({
            // @ts-expect-error complicated
            atom,
            add,
            remove,
            moveUp,
            moveDown,
            // @ts-expect-error complicated
            fields,
            index,
            count: items.length,
            RemoveItemButton: () => <RemoveItemButton remove={remove} />,
          })}
        </Fragment>
      ))}
      <AddItemButton add={useCallback(() => add(), [add])} />
    </>
  );
}
