import { useAtomValue } from "jotai";
import { ChangeEvent, useCallback, useState } from "react";

import { UseOptionProps, useFieldProps } from "..";
import { ZodField, ZodFieldValue } from "../../fields";

/**
 * This restricts ZodField to have optional schema defaulting to 'undefined of required schema'.
 */
export type SelectField = ZodField<any>;

export type UseSelectFieldProps<Option, Field extends SelectField> = {
  field: Field;
  getValue: (option: Option) => NonNullable<ZodFieldValue<Field>>;
} & Pick<UseOptionProps<Option>, "options">;

export const useSelectFieldProps = <Option, Field extends SelectField>({
  field,
  options,
  getValue,
}: UseSelectFieldProps<Option, Field>) => {
  const atom = useAtomValue(field);
  const fieldValue = useAtomValue(atom.value);
  const [value, setValue] = useState(options.indexOf(fieldValue));

  const getEventValue = useCallback(
    (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { value } = event.currentTarget;
      const index = parseInt(value);
      const activeOption = options[index];

      if (!activeOption) {
        throw new Error(`Index ${index} out of bounds.`);
      }

      setValue(index);
      return getValue(activeOption);
    },
    []
  );

  const props = useFieldProps<Field, HTMLSelectElement | HTMLInputElement>(
    field,
    getEventValue
  );

  return { ...props, value };
};
