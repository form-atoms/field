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

export type ListItemRenderProps<Fields extends ListAtomItems> = RenderProp<
  {
    item: ListItem<Fields>;
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
  } & RenderProp<unknown, "RemoveButton">
>;

export type ListFields = FieldAtom<any>[] | FormFields[];

export type ListFieldProps<
  Fields extends ListAtomItems,
  Value extends ListAtomValue<Fields>,
> = RenderProps & {
  field: ListField<Fields, Value>;
  initialValue?: Value[];
} & ListItemRenderProps<Fields>;

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
