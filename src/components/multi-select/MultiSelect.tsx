import {
  UseMultiSelectFieldProps,
  UseOptionsProps,
  ZodArrayField,
  useMultiSelectFieldProps,
  useSelectOptions,
} from "../../hooks";

export type MultiSelectProps<
  Option,
  Field extends ZodArrayField,
> = UseMultiSelectFieldProps<Option, Field> &
  Omit<UseOptionsProps<Option>, "field">;

export const MultiSelect = <Option, Field extends ZodArrayField>({
  field,
  getValue,
  getLabel,
  options,
}: MultiSelectProps<Option, Field>) => {
  const props = useMultiSelectFieldProps<Option, Field>({
    field,
    options,
    getValue,
  });

  const { selectOptions } = useSelectOptions({
    field,
    options,
    getLabel,
  });

  return (
    <select multiple {...props}>
      {selectOptions}
    </select>
  );
};
