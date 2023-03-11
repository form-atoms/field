import {
  SelectField,
  UseSelectFieldProps,
  UseSelectOptionsProps,
  useSelectFieldProps,
  useSelectOptions,
} from "../../hooks";

export type SelectProps<
  Option,
  Field extends SelectField
> = UseSelectFieldProps<Option, Field> &
  Omit<UseSelectOptionsProps<Option>, "field">;

export const Select = <Option, Field extends SelectField>({
  field,
  getValue,
  getLabel,
  options,
  placeholder,
}: SelectProps<Option, Field>) => {
  const props = useSelectFieldProps({
    field,
    options,
    getValue,
  });

  const { selectOptions } = useSelectOptions({
    field,
    getLabel,
    options,
    placeholder,
  });

  return <select {...props}>{selectOptions}</select>;
};
