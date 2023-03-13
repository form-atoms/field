import { FieldAtom } from "form-atoms";
import { ReactNode, useMemo } from "react";

export type UseOptionsProps<Option> = {
  field: FieldAtom<any>;
  getLabel: (option: Option) => ReactNode;
  options: readonly Option[];
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
