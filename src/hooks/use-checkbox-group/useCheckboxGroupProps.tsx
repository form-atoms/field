import { UseFieldOptions } from "form-atoms";
import { useAtomValue } from "jotai";
import { ChangeEvent, useMemo, useRef } from "react";

import {
  type UseMultiSelectFieldProps as UseCheckboxGroupFieldProps,
  useFieldProps,
} from "../";
import type { ZodArrayField, ZodFieldValue } from "../../fields";

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

  const prevValue = useRef(fieldValue);

  const activeIndexes = useRef<number[]>(
    fieldValue.map((activeOption) => optionValues.indexOf(activeOption)),
  );

  if (prevValue.current != fieldValue) {
    /**
     * The field was set from outside via initialValue, reset action, or set manually.
     * Recompute the indexes.
     **/
    activeIndexes.current = fieldValue.map((activeOption) =>
      optionValues.indexOf(activeOption),
    );
  }

  const getEventValue = (event: ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(event.currentTarget.value);
    const nextIndexes = event.currentTarget.checked
      ? [...activeIndexes.current, index]
      : activeIndexes.current.filter((val) => val != index);

    activeIndexes.current = nextIndexes;

    const nextValues = nextIndexes.map((index) => optionValues[index]);

    /**
     * When user change event happened, we set the value.
     * On the next render when the fieldValue is updated, we can skip calculating the activeIndexes.
     */
    prevValue.current = nextValues;

    return nextValues as ZodFieldValue<Field>;
  };

  const props = useFieldProps<Field, HTMLInputElement>(
    field,
    getEventValue,
    fieldOptions,
  );

  return { ...props, value: activeIndexes.current };
};
