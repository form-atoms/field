import {
  FieldAtom,
  FormAtom,
  FormFieldValues,
  FormFields,
  useForm,
  useFormActions,
} from "form-atoms";
import { del, push } from "object-path-immutable";
import React, { Fragment, useCallback, useMemo } from "react";
import { RenderProp } from "react-render-prop-type";

// TODO: array field should have possible validation attached e.g.  min(n).max(m) to have array of <n, m> items.
export const useArrayFieldActions = <
  Fields extends FormFields,
  Item extends FieldAtom<any> | FormFields
>(
  form: FormAtom<Fields>,
  builder: () => Item,
  path: (string | number)[]
) => {
  const { updateFields } = useFormActions(form);

  const remove = useCallback(
    (index: number) => {
      return updateFields((current) => {
        console.log(current, [...path, index], del(current, [...path, index]));
        return del(current, [...path, index]);
      });
    },
    [form]
  );

  const add = useCallback(() => {
    updateFields((current) => {
      return push(current, path, builder());
    });
  }, [form]);

  return { remove, add };
};

export function arrayFieldAtoms<TValue, TFieldAtom extends FieldAtom<TValue>>(
  builder: (value: TValue) => TFieldAtom,
  values: TValue[]
): TFieldAtom[];
export function arrayFieldAtoms<Fields extends FormFields>(
  builder: (values: FormFieldValues<Fields>) => Fields,
  values: FormFieldValues<Fields>[]
): Fields[];
// actual type must be one of overloads, as this one is ignored
export function arrayFieldAtoms<Fields extends FormFields>(
  builder: (values: FormFieldValues<Fields>) => Fields,
  values: FormFieldValues<Fields>[]
): Fields[] {
  return values.map(builder);
}

export type DeleteItemButtonProp = RenderProp<
  { remove: () => void },
  "DeleteItemButton"
>;

export type AddItemButtonProp = RenderProp<
  { add: () => void },
  "AddItemButton"
>;

export type EmptyMessageProp = RenderProp<unknown, "EmptyMessage">;

type RenderProps = Partial<
  DeleteItemButtonProp & AddItemButtonProp & EmptyMessageProp
>;

export type ArrayItemRenderProps<Fields> = RenderProp<
  {
    index: number;
    fields: Fields;
    add: () => void;
    remove: (index: number) => void;
  } & RenderProp<unknown, "DeleteItemButton">
>;

type ArrayFields = FieldAtom<any>[] | FormFields[];

type RecurrFormFields = FormFields | ArrayFields;

type ArrayFieldPropsRecurr<
  Fields extends RecurrFormFields,
  Path extends (string | number)[]
> = Path extends [
  infer P extends keyof Fields,
  ...infer R extends (string | number)[]
]
  ? Fields[P] extends RecurrFormFields
    ? ArrayFieldPropsRecurr<Fields[P], R>
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
      ArrayItemRenderProps<
        Fields extends (infer Item extends FieldAtom<any> | FormFields)[]
          ? Item
          : never
      >;

export type ArrayFieldProps<
  Fields extends FormFields,
  Path extends (string | number)[]
> = RenderProps &
  (Path extends [
    infer P extends keyof Fields,
    ...infer Rest extends (string | number)[]
  ]
    ? Fields[P] extends RecurrFormFields
      ? { form: FormAtom<Fields>; path: Path } & ArrayFieldPropsRecurr<
          Fields[P],
          Rest
        >
      : never
    : never);

export function ArrayField<
  Fields extends FormFields,
  Path extends (string | number)[]
>({
  path,
  form,
  builder,
  keyFrom,
  children,
  DeleteItemButton = ({ remove }) => <button onClick={remove}>delete</button>,
  AddItemButton = ({ add }) => <button onClick={add}>add item</button>,
  EmptyMessage,
}: ArrayFieldProps<Fields, Path>) {
  const { fieldAtoms } = useForm(form);

  const { add, remove } = useArrayFieldActions(form, builder, path);

  const array: ArrayFields = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return path.reduce(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (fields, key) => fields[key],
      fieldAtoms
    ) as ArrayFields;
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
            DeleteItemButton: () => (
              <DeleteItemButton remove={() => remove(index)} />
            ),
          })}
        </Fragment>
      ))}
      <AddItemButton add={add} />
    </>
  );
}
