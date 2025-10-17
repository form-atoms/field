import type { UseFieldOptions } from "form-atoms";
import { useAtomValue } from "jotai";
import { ChangeEvent, useCallback, useMemo } from "react";

import {
  type UseMultiSelectFieldProps as UseCheckboxGroupFieldProps,
  useFieldProps,
} from "../";
import type { ZodArrayField, ZodFieldValue } from "../../fields";

import { useIndexValue } from "../use-multiselect-field-props/useIndexValue";

export const useCheckboxGroupFieldProps = <Option, Field extends ZodArrayField>(
  { field, options, getValue }: UseCheckboxGroupFieldProps<Option, Field>,
  fieldOptions?: UseFieldOptions<ZodFieldValue<Field>>,
) => {
  const atom = useAtomValue(field);
  const fieldValue = useAtomValue(atom.value);
  const optionValues = useMemo(
    () => options.map(getValue),
    [getValue, options],
  );

  const { indexRef, value, setRefs } = useIndexValue({
    fieldValue,
    optionValues,
  });

  const getEventValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const index = event.currentTarget.value;
      const nextIndexes = event.currentTarget.checked
        ? [...indexRef.current, index]
        : indexRef.current.filter((val) => val != index);

      const nextValues = nextIndexes.map(
        (index) => optionValues[parseInt(index)],
      );

      setRefs({ nextIndexes, nextValues });

      return nextValues as ZodFieldValue<Field>;
    },
    [setRefs, indexRef, optionValues],
  );

  const props = useFieldProps<Field, HTMLInputElement>(
    field,
    getEventValue,
    fieldOptions,
  );

  return { ...props, value };
};
