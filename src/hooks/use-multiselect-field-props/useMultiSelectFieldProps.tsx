import { type ChangeEvent, useCallback, useMemo } from "react";
import { useFieldInitialValue, type UseFieldOptions } from "form-atoms";
import { useAtomValue } from "jotai";
import type { ZodAny, ZodArray } from "zod";
import { z } from "zod";

import { UseOptionsProps, useFieldProps } from "..";
import type { ZodArrayField, ZodField, ZodFieldValue } from "../../fields";
import { useIndexValue } from "./useIndexValue";

export type UseMultiSelectFieldProps<Option, Field extends ZodArrayField> = {
  field: Field;
  getValue: (option: Option) => ZodArrayFieldValue<Field>;
} & Pick<UseOptionsProps<Option>, "options">;

export type ZodArrayFieldValue<Field> =
  Field extends ZodField<ZodArray<infer Value>, ZodArray<ZodAny>>
    ? z.infer<Value>
    : never;

export const useMultiSelectFieldProps = <Option, Field extends ZodArrayField>(
  { field, options, getValue }: UseMultiSelectFieldProps<Option, Field>,
  { initialValue, ...atomOptions }: UseFieldOptions<ZodFieldValue<Field>> = {},
) => {
  useFieldInitialValue(field, initialValue, atomOptions);
  const atom = useAtomValue(field, atomOptions);
  const fieldValue = useAtomValue(atom.value, atomOptions);
  const optionValues = useMemo(
    () => options.map(getValue),
    [getValue, options],
  );

  const { value, setRefs } = useIndexValue({
    fieldValue,
    optionValues,
  });

  const getEventValue = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const nextIndexes = [...event.currentTarget.options]
        .filter((option) => option.selected)
        .map((option) => option.value);

      const nextValues = nextIndexes.map(
        (index) => optionValues[parseInt(index)],
      );

      setRefs({
        nextIndexes,
        nextValues,
      });

      return nextValues as ZodFieldValue<Field>;
    },
    [setRefs, optionValues],
  );

  const props = useFieldProps<Field, HTMLSelectElement>(
    field,
    getEventValue,
    atomOptions,
  );

  return { ...props, value };
};
