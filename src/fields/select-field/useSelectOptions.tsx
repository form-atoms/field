import { useFieldState } from "form-atoms";
import { ReactNode, useMemo } from "react";

import { SelectFieldAtom } from "./selectField";
import { FieldProps } from "../../hooks";

export type SelectFieldProps<Option, Value = string> = FieldProps<
  SelectFieldAtom<Value>
> &
  SelectProps<Option, Value>;

export type SelectProps<Option, Value = string> = {
  getValue: (option: Option) => Value;
  getLabel: (option: Option) => ReactNode;
  options: readonly Option[];
  placeholder?: string;
};

export function useSelectOptions<Option, Value = string>(
  field: SelectFieldAtom<Value>,
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
        const optionValue = getValue(option);

        return {
          option,
          value: optionValue,
          id: `${field}${optionValue}`,
          isActive: optionValue === value,
          label: getLabel(option),
        };
      }),
    [options, value, getValue, getLabel]
  );

  return useMemo(
    () => ({
      renderOptions,
      placeholderOption: (
        <option value="" disabled selected>
          {placeholder}
        </option>
      ),
    }),
    [renderOptions, placeholder]
  );
}
