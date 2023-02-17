import {
  FieldAtom,
  FormAtom,
  FormFieldValues,
  FormFields,
  fieldAtom,
  useForm,
  useFormActions,
} from "form-atoms";
import { del, push } from "object-path-immutable";
import React, { Fragment, useCallback, useMemo } from "react";
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
  } & RenderProp<unknown, "DeleteItemButton">
>;

export type ArrayFieldProps<
  Fields extends FormFields,
  Path extends (string | number)[],
  RPath extends (string | number)[] = [],
  RootFields extends FormFields = Fields
> = Path extends [
  infer P extends keyof Fields,
  ...infer R extends (string | number)[]
]
  ? Fields[P] extends FormFields
    ? ArrayFieldProps<Fields[P], R, [...RPath, Exclude<P, symbol>], RootFields>
    : Fields[P] extends FormFields[]
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ArrayFieldProps<Fields[P], R, [...RPath, Exclude<P, symbol>], RootFields>
    : Fields[P] extends (infer Item)[]
    ? {
        path: [...RPath, P];
        form: FormAtom<RootFields>;
        builder: () => Item;
      } & ArrayItemRenderProps<Item> &
        RenderProps
    : never
  : Fields extends (infer Item)[]
  ? {
      path: [...RPath];
      form: FormAtom<RootFields>;
      builder: () => Item;
    } & ArrayItemRenderProps<Item> &
      RenderProps
  : never;

const fields = {
  envs: [{ varName: fieldAtom({ value: 0 }) }],
  z: fieldAtom({ value: 2 }),
};

type One = ArrayFieldProps<typeof fields, ["envs"]>;

const flat = {
  envs: [fieldAtom({ value: 0 })],
};
type Flat = ArrayFieldProps<typeof flat, ["envs"]>;

const envs = [fieldAtom({ value: 0 })];
const deep = {
  foo: {
    envs: [fieldAtom({ value: 0 })],
  },
};

type T = typeof envs extends FormFields ? true : false;

type Deep = ArrayFieldProps<typeof deep, ["foo", "envs"]>;

const d3 = { deep };

type Deep3 = ArrayFieldProps<typeof d3, ["deep", "foo", "envs"]>;

const nested = { addresses: [{ people: [{ age: fieldAtom({ value: 0 }) }] }] };

type Nested = ArrayFieldProps<typeof nested, ["addresses", 0, "people"]>;

export function ArrayField<
  Fields extends FormFields,
  Path extends (string | number)[]
>({
  path,
  form,
  builder,
  children,
  DeleteItemButton = ({ remove }) => <button onClick={remove}>delete</button>,
  AddItemButton = ({ add }) => <button onClick={add}>add item</button>,
  EmptyMessage,
}: ArrayFieldProps<Fields, Path>) {
  const { fieldAtoms } = useForm(form);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
      {array.map((fields, index) => (
        <Fragment key={index}>
          {children({
            add,
            remove,
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
