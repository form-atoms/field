import { FieldAtom, useFieldState } from "form-atoms";
import { ReactNode, useMemo } from "react";
import { LastFieldProps } from "../last-field";

export type SelectFieldAtom = FieldAtom<string>;

export type SelectFieldProps<Option> = LastFieldProps<SelectFieldAtom> &
  SelectConfig<Option>;

export type SelectConfig<Option> = {
  getValue: (option: Option) => string;
  getLabel: (option: Option) => ReactNode; // maybe drop from the core
  options: readonly Option[];
};

export function useSelectOptions<Option>(
  fieldAtom: SelectFieldAtom,
  { getValue, getLabel, options }: SelectConfig<Option>
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
