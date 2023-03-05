import { ZodFieldValue } from "../../fields";
import {
  OptionFieldAtom,
  UseSelectOptionsProps,
  useOptionFieldProps,
  useSelectOptions,
} from "../../hooks";

export type SelectProps<Option, Field extends OptionFieldAtom> = {
  field: Field;
} & UseSelectOptionsProps<Option, ZodFieldValue<Field>>;

export const Select = <Option, Field extends OptionFieldAtom>({
  field,
  getValue,
  getLabel,
  options,
  placeholder,
}: SelectProps<Option, Field>) => {
  const props = useOptionFieldProps(field);

  const { selectOptions } = useSelectOptions({
    field,
    getValue,
    getLabel,
    options,
    placeholder,
  });

  return <select {...props}>{selectOptions}</select>;
};
