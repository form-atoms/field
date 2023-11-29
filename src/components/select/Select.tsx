import {
  SelectField,
  UseSelectFieldProps,
  UseSelectOptionsProps,
  useSelectFieldProps,
  useSelectOptions,
} from "../../hooks";
import { PlaceholderOption } from "../placeholder-option";

export type SelectProps<
  Option,
  Field extends SelectField,
> = UseSelectFieldProps<Option, Field> &
  UseSelectOptionsProps<Option> & { placeholder?: string };

export const Select = <Option, Field extends SelectField>({
  field,
  getValue,
  getLabel,
  options,
  placeholder = "Please select an option",
}: SelectProps<Option, Field>) => {
  const props = useSelectFieldProps({
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
    <select {...props}>
      {placeholder && (
        <PlaceholderOption disabled={props.required}>
          {placeholder}
        </PlaceholderOption>
      )}
      {selectOptions}
    </select>
  );
};
