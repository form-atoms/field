import { FieldAtom } from "form-atoms";
import { ReactNode, useMemo } from "react";

export type UseOptionsProps<Option> = {
  field: FieldAtom<any>;
  options: readonly Option[];
  getLabel: (option: Option) => ReactNode;
};

export function useOptions<Option>({
  field,
  getLabel,
  options,
}: UseOptionsProps<Option>) {
  return useMemo(
    () => ({
      renderOptions: options.map((option, index) => {
        return {
          id: `${field}/${index}`,
          value: index,
          label: getLabel(option),
        };
      }),
    }),
    [options, field, getLabel]
  );
}
