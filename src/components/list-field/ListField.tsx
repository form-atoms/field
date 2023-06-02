import {
  FieldAtom,
  FormAtom,
  FormFieldValues,
  FormFields,
  useForm,
} from "form-atoms";
import React, { Fragment, useMemo } from "react";
import { RenderProp } from "react-render-prop-type";

import { useListFieldActions } from "./useListFieldActions";

export function listFieldAtoms<TValue, TFieldAtom extends FieldAtom<TValue>>(
  builder: (value: TValue) => TFieldAtom,
  values: TValue[]
): TFieldAtom[];
export function listFieldAtoms<Fields extends FormFields>(
  builder: (values: FormFieldValues<Fields>) => Fields,
  values: FormFieldValues<Fields>[]
): Fields[];
// actual type must be one of overloads, as this one is ignored
export function listFieldAtoms<Fields extends FormFields>(
  builder: (values: FormFieldValues<Fields>) => Fields,
  values: FormFieldValues<Fields>[]
): Fields[] {
  return values.map(builder);
}

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
    index: number;
    fields: Fields;
    add: () => void;
    remove: (index: number) => void;
  } & RenderProp<unknown, "RemoveItemButton">
>;

type ListFields = FieldAtom<any>[] | FormFields[];

type RecurrFormFields = FormFields | ListFields;

type ListFieldPropsRecurr<
  Fields extends RecurrFormFields,
  Path extends (string | number)[]
> = Path extends [
  infer P extends keyof Fields,
  ...infer R extends (string | number)[]
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
  Path extends (string | number)[]
> = RenderProps &
  (Path extends [
    infer P extends keyof Fields,
    ...infer Rest extends (string | number)[]
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
  Path extends (string | number)[]
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
  const { fieldAtoms } = useForm(form);

  const { add, remove } = useListFieldActions(form, builder, path);

  const array: ListFields = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return path.reduce(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (fields, key) => fields[key],
      fieldAtoms
    ) as ListFields;
  }, [path, fieldAtoms]);

  const keyFn = (fields: FieldAtom<any> | FormFields) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return typeof keyFrom === "string" ? `${fields[keyFrom]}` : `${fields}`;
  };

  return (
    <>
      {array.length === 0 && EmptyMessage ? <EmptyMessage /> : undefined}
      {array.map((fields, index) => (
        <Fragment key={keyFn(fields)}>
          {children({
            add,
            remove,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            fields,
            index,
            RemoveItemButton: () => (
              <RemoveItemButton remove={() => remove(index)} />
            ),
          })}
        </Fragment>
      ))}
      <AddItemButton add={add} />
    </>
  );
}
