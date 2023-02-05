import {
  fieldAtom,
  FieldAtom,
  FieldAtomConfig,
  useFieldState,
} from "form-atoms";
import { ReactNode, useMemo } from "react";
import { LastFieldProps } from "../last-field";
import { z } from "zod";
import { zodValidate } from "form-atoms/zod";

export type SelectFieldProps<Option, Value = string> = LastFieldProps<
  FieldAtom<Value>
> &
  SelectConfig<Option, Value>;

export type SelectConfig<Option, Value = string> = {
  getValue: (option: Option) => Value;
  getLabel: (option: Option) => ReactNode; // maybe drop from the core
  options: readonly Option[];
  placeholder?: string;
};

const emptyValue = "" as const;

export const selectFieldAtom = <Value,>(
  config: Partial<FieldAtomConfig<Value | typeof emptyValue>>
) =>
  fieldAtom({
    value: emptyValue,
    validate: zodValidate(z.string().min(1), { on: "change" }), // required by default
    ...config,
  });

export function useSelectOptions<Option, Value = string>(
  fieldAtom: FieldAtom<Value>,
  {
    getValue,
    getLabel,
    options,
    placeholder = "Please select an option",
  }: SelectConfig<Option, Value>
) {
  const { value } = useFieldState(fieldAtom);

  const renderOptions = useMemo(
    () =>
      options.map((option) => {
        const isActive = getValue(option) === value;

        return {
          option,
          isActive,
          value: getValue(option),
          label: getLabel(option),
        };
      }),
    [options, value, getValue, getLabel]
  );

  return useMemo(
    () => ({
      renderOptions,
      placeholderOption: (
        <option value={emptyValue} disabled selected>
          {placeholder}
        </option>
      ),
    }),
    [renderOptions, placeholder]
  );
}
