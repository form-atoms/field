import { FieldAtom } from "form-atoms";
import { ReactNode, useMemo } from "react";

export type UseOptionProps<Option> = {
  field: FieldAtom<any>;
  getLabel: (option: Option) => ReactNode;
  options: readonly Option[];
};

export function useOptions<Option>({
  field,
  getLabel,
  options,
}: UseOptionProps<Option>) {
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
