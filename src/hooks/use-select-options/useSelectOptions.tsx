import { OptionHTMLAttributes, useMemo } from "react";

import { ZodField } from "../../fields/zodField";
import { OptionProps, useOptions } from "../use-options";

type HTMLOptionValue = OptionHTMLAttributes<HTMLOptionElement>["value"];

export type SelectOptionsProps<
  Option,
  OptionValue extends HTMLOptionValue = string,
  FieldValue = OptionValue
> = OptionProps<Option, OptionValue, FieldValue> & {
  placeholder?: string;
};

export function useSelectOptions<
  Option,
  OptionValue extends HTMLOptionValue = string,
  FieldValue = OptionValue
>(
  field: ZodField<FieldValue>,
  {
    placeholder = "Please select an option",
    ...optionsProps
  }: SelectOptionsProps<Option, OptionValue, FieldValue>
) {
  const { renderOptions } = useOptions<Option, OptionValue, FieldValue>(
    field,
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
