import { ZodFieldValue } from "../../fields";
import {
  OptionField,
  OptionValue,
  UseSelectOptionsProps,
  useOptionFieldProps,
  useSelectOptions,
} from "../../hooks";

export type SelectProps<
  Option,
  Field extends OptionField,
  TOptionValue extends OptionValue = ZodFieldValue<Field>
> = {
  field: Field;
  multiple?: boolean;
} & UseSelectOptionsProps<Option, ZodFieldValue<Field>, TOptionValue>;

export const Select = <
  Option,
  Field extends OptionField,
  TOptionValue extends OptionValue = ZodFieldValue<Field>
>({
  field,
  getValue,
  getLabel,
  options,
  placeholder,
  multiple = false,
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
