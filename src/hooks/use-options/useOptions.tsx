import { useFieldState } from "form-atoms";
import { ReactNode, useMemo } from "react";

import { ValidatedFieldAtom } from "../../fields";

export type OptionProps<
  Option,
  OptionValue = string,
  FieldValue = OptionValue
> = {
  getValue: (option: Option) => OptionValue;
  getLabel: (option: Option) => ReactNode;
  isChecked?: (optionValue: OptionValue, fieldValue: FieldValue) => boolean;
  options: readonly Option[];
};

export function useOptions<
  Option,
  OptionValue = string,
  FieldValue = OptionValue
>(
  field: ValidatedFieldAtom<FieldValue>,
  {
    getValue,
    getLabel,
    // @ts-expect-error its fine to compare field and option value by default
    isChecked = (optionValue, fieldValue) => optionValue === fieldValue,
    options,
  }: OptionProps<Option, OptionValue, FieldValue>
) {
  const { value } = useFieldState(field);

  return useMemo(
    () => ({
      renderOptions: options.map((option) => {
        const optionValue = getValue(option);

        return {
          id: `${field}/${optionValue}`,
          value: optionValue,
          checked: isChecked(optionValue, value),
          label: getLabel(option),
        };
      }),
    }),
    [options, value, getValue, getLabel]
  );
}
