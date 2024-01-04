import { FieldAtom, FormFields } from "form-atoms";
import { Fragment, useCallback } from "react";
import { RenderProp } from "react-render-prop-type";

import { ListAtomItems, ListAtomValue } from "../../atoms/list-atom";
import { type ListField } from "../../fields";
import { ListItem, useListField } from "../../hooks";

export type RemoveButtonProps = { remove: () => void };
export type RemoveButtonProp = RenderProp<RemoveButtonProps, "RemoveButton">;

export type AddButtonProps = { add: () => void };
export type AddButtonProp = RenderProp<AddButtonProps, "AddButton">;

export type EmptyProp = RenderProp<unknown, "Empty">;

type RenderProps = Partial<RemoveButtonProp & AddButtonProp & EmptyProp>;

export type ListItemProps<Fields extends ListAtomItems> = {
  item: ListItem<Fields>;
  /**
   * The index of the current item.
   */
  index: number;
  /**
   * Total count of items in the list.
   */
  count: number;
  /**
   * The fields of current item, as returned from the builder function.
   */
  fields: Fields;
  /**
   * Append a new item to the end of the list.
   * WHen called with current item, it will be prepend with a new item.
   */
  add: (before?: ListItem<Fields>) => void;
  /**
   * Removes the current item.
   */
  remove: () => void;
  /**
   * Moves the current item one slot up in the list.
   * When called for the first item, the action is no-op.
   */
  moveUp: () => void;
  /**
   * Moves the current item one slot down in the list.
   * When called for the last item, the item moves to the start of the list.
   */
  moveDown: () => void;
} & RenderProp<unknown, "RemoveButton">;
export type ListItemProp<Fields extends ListAtomItems> = RenderProp<
  ListItemProps<Fields>
>;

export type ListFields = FieldAtom<any>[] | FormFields[];

export type ListFieldProps<
  Fields extends ListAtomItems,
  Value extends ListAtomValue<Fields>,
> = RenderProps & {
  field: ListField<Fields, Value>;
  initialValue?: Value[];
} & ListItemProp<Fields>;

export function ListField<
  Fields extends ListAtomItems,
  Value extends ListAtomValue<Fields>,
>({
  field,
  initialValue,
  children,
  RemoveButton = ({ remove }) => (
    <button type="button" onClick={remove}>
      Remove
    </button>
  ),
  AddButton = ({ add }) => (
    <button type="button" onClick={add}>
      Add item
    </button>
  ),
  Empty,
}: ListFieldProps<Fields, Value>) {
  const { add, isEmpty, items } = useListField(field, { initialValue });

  return (
    <>
      {isEmpty && Empty ? <Empty /> : undefined}
      {items.map(({ remove, fields, key, item, moveUp, moveDown }, index) => (
        <Fragment key={key}>
          {children({
            item,
            add,
            remove,
            moveUp,
            moveDown,
            fields,
            index,
            count: items.length,
            RemoveButton: () => <RemoveButton remove={remove} />,
          })}
        </Fragment>
      ))}
      <AddButton add={useCallback(() => add(), [add])} />
    </>
  );
}
