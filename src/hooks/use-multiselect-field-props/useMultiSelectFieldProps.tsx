import { UseFieldOptions } from "form-atoms";
import { useAtomValue } from "jotai";
import { ChangeEvent, useCallback, useMemo, useRef } from "react";
import { ArrayCardinality, ZodAny, ZodArray } from "zod";

import { UseOptionsProps, useFieldProps } from "..";
import { ZodArrayField, ZodField, ZodFieldValue } from "../../fields";

export type UseMultiSelectFieldProps<Option, Field extends ZodArrayField> = {
  field: Field;
  getValue: (option: Option) => ZodArrayFieldValue<Field>;
} & Pick<UseOptionsProps<Option>, "options">;

export type ZodArrayFieldValue<Field> =
  Field extends ZodField<
    ZodArray<infer Value, ArrayCardinality>,
    ZodArray<ZodAny, ArrayCardinality>
  >
    ? Value["_output"]
    : never;

export const useMultiSelectFieldProps = <Option, Field extends ZodArrayField>(
  { field, options, getValue }: UseMultiSelectFieldProps<Option, Field>,
  fieldOptions?: UseFieldOptions<ZodFieldValue<Field>>,
) => {
  const atom = useAtomValue(field);
  const fieldValue = useAtomValue(atom.value);
  const optionValues = useMemo(
    () => options.map(getValue),
    [getValue, options],
  );

  const prevValue = useRef(fieldValue);

  const activeIndexes = useRef<string[]>(
    fieldValue.map((activeOption) => `${optionValues.indexOf(activeOption)}`),
  );

  if (prevValue.current != fieldValue) {
    /**
     * The field was set from outside via initialValue, reset action, or set manually.
     * Recompute the indexes.
     **/
    activeIndexes.current = fieldValue.map(
      (activeOption) => `${optionValues.indexOf(activeOption)}`,
    );
  }
  const getEventValue = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const nextIndexes = [...event.currentTarget.options]
      .filter((option) => option.selected)
      .map((option) => option.value);

    activeIndexes.current = nextIndexes;

    const nextValues = nextIndexes.map(
      (index) => optionValues[parseInt(index)],
    );

    /**
     * When user change event happened, we set the value.
     * On the next render when the fieldValue is updated, we can skip calculating the activeIndexes.
     */
    prevValue.current = nextValues;

    return nextValues as ZodFieldValue<Field>;
  }, []);

  const props = useFieldProps<Field, HTMLSelectElement>(
    field,
    getEventValue,
    fieldOptions,
  );

  return { ...props, value: activeIndexes.current };
};
