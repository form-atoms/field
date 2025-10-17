/* eslint-disable react-hooks/refs */
import { useCallback, useRef } from "react";

type UseIndexValueParams = {
  fieldValue: readonly unknown[];
  optionValues: readonly unknown[];
};

const EMPTY_REF = [] as const;

/**
 * Custom hook to manage the active indexes of a multi options field.
 * @returns A tuple containing the active indexes and a function to set the refs.
 */
export function useIndexValue({
  fieldValue,
  optionValues,
}: UseIndexValueParams) {
  const prevValue = useRef(fieldValue);
  const activeIndexes = useRef<readonly string[]>(EMPTY_REF);

  if (activeIndexes.current === EMPTY_REF) {
    // prevent recalculation on every render
    activeIndexes.current = fieldValue.map(
      (activeOption) => `${optionValues.indexOf(activeOption)}`,
    );
  }

  if (prevValue.current != fieldValue) {
    /**
     * The field was set from outside via initialValue, reset action, or set manually.
     * Recompute the indexes.
     **/
    activeIndexes.current = fieldValue.map(
      (activeOption) => `${optionValues.indexOf(activeOption)}`,
    );
  }
  const setRefs = useCallback(
    ({
      nextIndexes,
      nextValues,
    }: {
      nextIndexes: readonly string[];
      nextValues: readonly unknown[];
    }) => {
      activeIndexes.current = nextIndexes;

      /**
       * When user change event happened, we set the value.
       * On the next render when the fieldValue is updated, we can skip calculating the activeIndexes.
       */
      prevValue.current = nextValues;
    },
    [prevValue, activeIndexes],
  );

  return [activeIndexes.current, setRefs] as const;
}
