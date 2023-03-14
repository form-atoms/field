import { useMemo } from "react";

import { UseOptionsProps, useOptions } from "../use-options";
import { EMPTY_VALUE } from "../use-select-field-props";

export type UseSelectOptionsProps<Option> = UseOptionsProps<Option> & {
  /**
   * A text for a custom placeholder option at the start of selectOptions.
   * @default "Please select an option"
   */
  placeholder?: string;
};

export function useSelectOptions<Option>({
  placeholder = "Please select an option",
  ...optionsProps
}: UseSelectOptionsProps<Option>) {
  const { renderOptions } = useOptions(optionsProps);

  return useMemo(
    () => ({
      selectOptions: (
        <>
          {placeholder && (
            <option value={EMPTY_VALUE} disabled selected>
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
