import { useMemo } from "react";

import { OptionProps, OptionValue, useOptions } from "../use-options";

export type SelectOptionsProps<
  Option,
  FieldValue extends OptionValue,
  TOptionValue extends OptionValue = FieldValue
> = OptionProps<Option, FieldValue, TOptionValue> & {
  placeholder?: string;
};

export function useSelectOptions<
  Option,
  FieldValue extends OptionValue,
  TOptionValue extends OptionValue = FieldValue
>({
  placeholder = "Please select an option",
  ...optionsProps
}: SelectOptionsProps<Option, FieldValue, TOptionValue>) {
  const { renderOptions } = useOptions<Option, FieldValue, TOptionValue>(
    optionsProps
  );

  return useMemo(
    () => ({
      selectOptions: (
        <>
          {placeholder && (
            <option value="" disabled selected>
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
