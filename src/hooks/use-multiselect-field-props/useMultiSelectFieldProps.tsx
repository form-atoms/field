import { useAtomValue } from "jotai";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { ZodArray, ZodString } from "zod";

import { UseOptionsProps, useFieldProps } from "..";
import { ZodField, ZodFieldValue } from "../../fields";

export type ZodArrayField = ZodField<ZodArray<any, any>, ZodArray<any, any>>;

export type UseMultiSelectFieldProps<Option, Field extends ZodArrayField> = {
  field: Field;
  getValue: (option: Option) => ZodArrayFieldValue<Field>;
} & Pick<UseOptionsProps<Option>, "options">;

type T = UseMultiSelectFieldProps<
  string,
  ZodField<ZodArray<ZodString, "atleastone">, ZodArray<ZodString, "many">>
>;

export type ZodArrayFieldValue<Field> = Field extends ZodField<
  ZodArray<infer Value, any>,
  ZodArray<any, any>
>
  ? Value["_output"]
  : never;

export const useMultiSelectFieldProps = <Option, Field extends ZodArrayField>({
  field,
  options,
  getValue,
}: UseMultiSelectFieldProps<Option, Field>) => {
  const atom = useAtomValue(field);
  const fieldValue = useAtomValue(atom.value);
  // TODO: getValue should be useMemo dependency, currently we asume it's stable
  const values = useMemo(() => options.map(getValue), [options]);
  const [value, setValue] = useState<string[]>(() =>
    fieldValue.map((value) => `${values.indexOf(value)}`)
  );

  const getEventValue = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const value = [...event.currentTarget.options]
      .filter((option) => option.selected)
      .map((option) => option.value);

    setValue(value);

    const nextValue = value.map((idx) => values[parseInt(idx)]);

    return nextValue as ZodFieldValue<Field>;
  }, []);

  const props = useFieldProps<Field, HTMLSelectElement>(field, getEventValue);

  return { ...props, value };
};