import { useMemo } from "react";

import { OptionValue, UseOptionProps, useOptions } from "../use-options";

export type UseSelectOptionsProps<
  Option,
  FieldValue extends OptionValue,
  TOptionValue extends OptionValue = FieldValue
> = UseOptionProps<Option, FieldValue, TOptionValue> & {
  placeholder?: string;
};

export function useSelectOptions<
  Option,
  FieldValue extends OptionValue,
  TOptionValue extends OptionValue = FieldValue
>({
  placeholder = "Please select an option",
  ...optionsProps
}: UseSelectOptionsProps<Option, FieldValue, TOptionValue>) {
  const { renderOptions } = useOptions<Option, FieldValue, TOptionValue>(
    optionsProps
  );

  return useMemo(
    () => ({
      selectOptions: (
        <>
          {placeholder && (
            <option value="__PLACEHOLDER__" disabled selected>
              {placeholder}
            </option>
          )}
          {renderOptions.map(({ id, value, label }) => (
            <option key={id} value={value}>
              {label}
            </option>
          ))}
        </>
      ),
    }),
    [renderOptions, placeholder]
  );
}
