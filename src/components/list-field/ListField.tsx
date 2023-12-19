import { FieldAtom, FormFields } from "form-atoms";
import { Fragment, useCallback } from "react";
import { RenderProp } from "react-render-prop-type";

import { type ListField, ListFieldItems, ListFieldValue } from "../../fields";
import { ListItem, useListField } from "../../hooks";

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

export type ListItemRenderProps<Fields extends ListFieldItems> = RenderProp<
  {
    atom: ListItem<Fields>;
    /**
     * The index of the current item.
     */
    index: number;
    /**
     * Total count of items in the list.
     */
    count: number;
    fields: Fields;
    add: (before?: ListItem<Fields>) => void;
    remove: (field: FieldAtom<any> | FormFields) => void;
    moveUp: () => void;
    moveDown: () => void;
  } & RenderProp<unknown, "RemoveItemButton">
>;

export type ListFields = FieldAtom<any>[] | FormFields[];

export type ListFieldProps<
  Fields extends ListFieldItems,
  Value extends ListFieldValue<Fields>,
> = RenderProps & {
  field: ListField<Fields, Value>;
  initialValue?: Value[];
} & ListItemRenderProps<Fields>;

export function ListField<
  Fields extends ListFieldItems,
  Value extends ListFieldValue<Fields>,
>({
  field,
  initialValue,
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
}: ListFieldProps<Fields, Value>) {
  const { add, isEmpty, items } = useListField(field, { initialValue });

  return (
    <>
      {isEmpty && EmptyMessage ? <EmptyMessage /> : undefined}
      {items.map(({ remove, fields, key, atom, moveUp, moveDown }, index) => (
        <Fragment key={key}>
          {children({
            atom,
            add,
            remove,
            moveUp,
            moveDown,
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
