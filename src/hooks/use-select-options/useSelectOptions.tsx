import { useMemo } from "react";

import { UseOptionsProps, useOptions } from "../use-options";

export function useSelectOptions<Option>(props: UseOptionsProps<Option>) {
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
    [renderOptions],
  );
}
