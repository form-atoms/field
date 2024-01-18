import { UseFieldOptions } from "form-atoms";

import { ZodArrayField, ZodFieldValue } from "../../fields";
import {
  UseMultiSelectFieldProps,
  UseOptionsProps,
  useMultiSelectFieldProps,
  useSelectOptions,
} from "../../hooks";

export type MultiSelectProps<
  Option,
  Field extends ZodArrayField,
> = UseMultiSelectFieldProps<Option, Field> &
  Omit<UseOptionsProps<Option>, "field"> &
  Pick<UseFieldOptions<ZodFieldValue<Field>>, "initialValue">;

export const MultiSelect = <Option, Field extends ZodArrayField>({
  field,
  getValue,
  getLabel,
  options,
  initialValue,
}: MultiSelectProps<Option, Field>) => {
  const props = useMultiSelectFieldProps<Option, Field>(
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
    <select multiple {...props}>
      {selectOptions}
    </select>
  );
};
