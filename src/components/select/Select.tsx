import { ZodFieldValue } from "../../fields";
import {
  OptionFieldAtom,
  OptionValue,
  UseSelectOptionsProps,
  useOptionFieldProps,
  useSelectOptions,
} from "../../hooks";

export type SelectProps<
  Option,
  Field extends OptionFieldAtom,
  TOptionValue extends OptionValue = ZodFieldValue<Field>
> = {
  field: Field;
  multiple?: boolean;
} & UseSelectOptionsProps<Option, ZodFieldValue<Field>, TOptionValue>;

export const Select = <
  Option,
  Field extends OptionFieldAtom,
  TOptionValue extends OptionValue = ZodFieldValue<Field>
>({
  field,
  multiple = false,
  getValue,
  getLabel,
  options,
  placeholder,
}: SelectProps<Option, Field, TOptionValue>) => {
  const props = useOptionFieldProps(field);

  const { selectOptions } = useSelectOptions({
    field,
    getValue,
    getLabel,
    options,
    placeholder,
  });

  return (
    <select {...props} multiple={multiple}>
      {selectOptions}
    </select>
  );
};
