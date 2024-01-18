import {
  SelectField,
  SelectFieldProps,
  UseOptionsProps,
  useSelectFieldProps,
  useSelectOptions,
} from "../../hooks";
import { PlaceholderOption } from "../placeholder-option";

export type SelectProps<Option, Field extends SelectField> = SelectFieldProps<
  Option,
  Field
> &
  UseOptionsProps<Option> & { placeholder?: string };

export const Select = <Option, Field extends SelectField>({
  field,
  getValue,
  getLabel,
  options,
  placeholder = "Please select an option",
  initialValue,
}: SelectProps<Option, Field>) => {
  const props = useSelectFieldProps(
    {
      field,
      options,
      getValue,
    },
    { initialValue },
  );

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
