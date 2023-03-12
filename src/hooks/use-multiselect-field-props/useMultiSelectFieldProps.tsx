import { useAtomValue } from "jotai";
import { ChangeEvent, useCallback, useState } from "react";
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
  // TODO: initialize from field value
  const [value, setValue] = useState<string[]>([]);

  const getEventValue = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const values = [...event.currentTarget.options]
      .filter(({ selected }) => selected)
      .map(({ value }) => value);

    setValue(values);

    const activeOptions = values
      .map((val) => parseInt(val))
      .map((idx) => options[idx])
      .filter(Boolean) as Option[];

    return activeOptions.map(getValue) as ZodFieldValue<Field>;
  }, []);

  const props = useFieldProps<Field, HTMLSelectElement>(field, getEventValue);

  return { ...props, value };
};
