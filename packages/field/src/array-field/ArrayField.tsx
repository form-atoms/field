import {
  FieldAtom,
  FormAtom,
  FormFieldValues,
  FormFields,
  fieldAtom,
  formAtom,
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
    : 3 // ["ERR: Path ", P, " is neither array nor fields object."]
  : {
      builder: () => Fields extends (infer Item extends
        | FieldAtom<any>
        | FormFields)[]
        ? Item
        : never;
    } & ArrayItemRenderProps<
      Fields extends (infer Item extends FieldAtom<any> | FormFields)[]
        ? Item
        : never
    >;

export type ArrayFieldProps<
  Fields extends FormFields,
  Path extends (string | number)[]
> = Path extends [
  infer P extends keyof Fields,
  ...infer Rest extends (string | number)[]
]
  ? Fields[P] extends RecurrFormFields
    ? { form: FormAtom<Fields>; path: Path } & ArrayFieldPropsRecurr<
        Fields[P],
        Rest
      >
    : 2
  : 1;

const fields = {
  envs: [{ varName: fieldAtom({ value: 0 }) }],
  z: fieldAtom({ value: 2 }),
};
type One = ArrayFieldProps<typeof fields, [""]>;

// TODO: suport in core?
const base: RecurrFormFields = [fieldAtom({ value: 0 })];

// type Arr = ArrayFieldProps<typeof base, []>;

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

type Deep = ArrayFieldProps<typeof deep, [3]>;

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
}: RenderProps &
  (Path extends [
    infer P extends keyof Fields,
    ...infer Rest extends (string | number)[]
  ]
    ? Fields[P] extends RecurrFormFields
      ? { form: FormAtom<Fields>; path: Path } & ArrayFieldPropsRecurr<
          Fields[P],
          Rest
        >
      : Record<string, number>
    : Record<string, number>)) {
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

const Simple = () => (
  <ArrayField
    path={["envs"]}
    form={formAtom(fields)}
    builder={() => ({ varName: fieldAtom({ value: 0 }) })}
  >
    {({ fields }) => <></>}
  </ArrayField>
);
