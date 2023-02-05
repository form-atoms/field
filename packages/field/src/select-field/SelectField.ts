import { FieldAtom, useFieldState } from "form-atoms";
import { ReactNode, useMemo } from "react";
import { LastFieldProps } from "../last-field";

export type SelectFieldProps<Option, Value = string> = LastFieldProps<
  FieldAtom<Value>
> &
  SelectConfig<Option, Value>;

export type SelectConfig<Option, Value = string> = {
  getValue: (option: Option) => Value;
  getLabel: (option: Option) => ReactNode; // maybe drop from the core
  options: readonly Option[];
};

export function useSelectOptions<Option, Value = string>(
  fieldAtom: FieldAtom<Value>,
  { getValue, getLabel, options }: SelectConfig<Option, Value>
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

  return useMemo(() => ({ renderOptions }), [renderOptions]);
}
