import { useFieldState } from "form-atoms";
import { useMemo } from "react";

import { MultiSelectFieldAtom } from "./multiSelectField";
import { FieldProps } from "..";
import { SelectProps } from "../select-field";

export type MultiSelectFieldProps<Option, Value = string> = FieldProps<
  MultiSelectFieldAtom<Value>
> &
  SelectProps<Option, Value>;

export function useMultiSelectOptions<Option, Value = string>(
  field: MultiSelectFieldAtom<Value>,
  {
    getValue,
    getLabel,
    options,
    placeholder = "Please select an option",
  }: SelectProps<Option, Value>
) {
  const { value } = useFieldState(field);

  const renderOptions = useMemo(
    () =>
      options.map((option) => {
        return {
          option,
          isActive: value.includes(getValue(option)),
          value: getValue(option),
          label: getLabel(option),
        };
      }),
    [options, value, getValue, getLabel]
  );

  return useMemo(
    () => ({
      renderOptions,
      // TODO: probably drop
      placeholderOption: (
        <option value="" disabled selected>
          {placeholder}
        </option>
      ),
    }),
    [renderOptions, placeholder]
  );
}
