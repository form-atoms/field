import { useAtomValue } from "jotai";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { UseOptionsProps, useFieldProps } from "..";
import { ZodField, ZodFieldValue } from "../../fields";

/**
 * This restricts ZodField to have optional schema defaulting to 'undefined of required schema'.
 */
export type SelectField = ZodField<any>;

export type UseSelectFieldProps<Option, Field extends SelectField> = {
  field: Field;
  getValue: (option: Option) => NonNullable<ZodFieldValue<Field>>;
} & Pick<UseOptionsProps<Option>, "options">;

/**
 * When field is empty, we map the undefined from data layer to -1 on presentation (UI) layer.
 */
export const EMPTY_VALUE = -1;

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

  useEffect(() => {
    if (fieldValue === undefined) {
      // reset local state, when form was reset
      setValue(EMPTY_VALUE);
    }
  }, [fieldValue]);

  const props = useFieldProps<Field, HTMLSelectElement | HTMLInputElement>(
    field,
    getEventValue
  );

  return { ...props, value };
};
