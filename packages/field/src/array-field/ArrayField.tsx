import {
  FieldAtom,
  FormAtom,
  FormFieldValues,
  FormFields,
  useForm,
  useFormActions,
} from "form-atoms";
import { del, push } from "object-path-immutable";
import React, { useCallback, useMemo } from "react";
import { RenderProp } from "react-render-prop-type";

// TODO: array field should have possible validation attached e.g.  min(n).max(m) to have array of <n, m> items.
export const useArrayFieldActions = <Fields extends FormFields>(
  form: FormAtom<Fields>,
  builder: () => Fields,
  path: string[]
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
  } & RenderProp<never, "DeleteItemButton">
>;

export function ArrayField<
  Fields extends FormFields,
  P1 extends keyof Fields,
  P2 extends Extract<keyof Fields[P1], number>,
  P3 extends keyof Fields[P1][P2]
>(
  props: {
    path: [P1, P2, P3];
    form: Fields[P1][P2][P3] extends FormFields[] ? FormAtom<Fields> : never;
    builder: () => Fields[P1][P2][P3] extends (infer ItemFields)[]
      ? ItemFields
      : never;
  } & ArrayItemRenderProps<
    Fields[P1][P2][P3] extends (infer ItemFields)[] ? ItemFields : never
  > &
    RenderProps
): JSX.Element;
export function ArrayField<
  Fields extends FormFields,
  P1 extends keyof Fields,
  P2 extends keyof Fields[P1]
>(
  props: {
    path: [P1, P2];
    form: FormAtom<Fields>;
    builder: () => Fields[P1][P2] extends (infer ItemType)[] ? ItemType : never;
  } & ArrayItemRenderProps<
    Fields[P1][P2] extends (infer ItemFields)[] ? ItemFields : never
  > &
    RenderProps
): JSX.Element;
export function ArrayField<Fields extends FormFields, P1 extends keyof Fields>(
  props: {
    path: [P1];
    form: Fields[P1] extends FormFields[]
      ? FormAtom<Fields>
      : Fields[P1] extends FieldAtom<unknown>[]
      ? FormAtom<Fields>
      : never;
    builder: () => Fields[P1] extends (infer ItemType)[] ? ItemType : never;
  } & ArrayItemRenderProps<
    Fields[P1] extends (infer ItemFields)[] ? ItemFields : never
  > &
    RenderProps
): JSX.Element;
export function ArrayField<Fields extends FormFields>({
  path,
  form,
  builder,
  children,
  DeleteItemButton = ({ remove }) => <button onClick={remove}>delete</button>,
  AddItemButton = ({ add }) => <button onClick={add}>add item</button>,
  EmptyMessage,
}: {
  path: string[];
  form: FormAtom<Fields>;
  builder: () => Fields;
} & ArrayItemRenderProps<unknown> &
  RenderProps) {
  const { fieldAtoms } = useForm(form);

  const { add, remove } = useArrayFieldActions(form, builder, path);

  const array: FormFields[] = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return path.reduce(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (fields, key) => fields[key],
      fieldAtoms
    ) as FormFields[];
  }, [path, fieldAtoms]);

  return (
    <>
      {array.length === 0 && EmptyMessage ? <EmptyMessage /> : undefined}
      {array.map((fields, index) =>
        children({
          add,
          remove,
          fields,
          index,
          DeleteItemButton: () => (
            <DeleteItemButton remove={() => remove(index)} />
          ),
        })
      )}
      <AddItemButton add={add} />
    </>
  );
}
