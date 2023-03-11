import {
  UseMultiSelectFieldProps,
  UseOptionProps,
  ZodArrayField,
  useMultiSelectFieldProps,
  useSelectOptions,
} from "../../hooks";

export type MultiSelectProps<
  Option,
  Field extends ZodArrayField
> = UseMultiSelectFieldProps<Option, Field> &
  Omit<UseOptionProps<Option>, "field">;

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
    placeholder: "",
    field,
    getLabel,
    options,
  });

  return (
    <select multiple {...props}>
      {selectOptions}
    </select>
  );
};
