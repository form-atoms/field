import { useMemo } from "react";

import { UseOptionsProps, useOptions } from "../use-options";

export type UseSelectOptionsProps<Option> = UseOptionsProps<Option>;

export function useSelectOptions<Option>(props: UseSelectOptionsProps<Option>) {
  const { renderOptions } = useOptions(props);

  return useMemo(
    () => ({
      selectOptions: (
        <>
          {renderOptions.map(({ id, value, label }) => (
            <option key={id} value={value}>
              {label}
            </option>
          ))}
        </>
      ),
    }),
    [renderOptions]
  );
}
