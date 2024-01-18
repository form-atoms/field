import { UseFieldOptions } from "form-atoms";
import { useAtomValue } from "jotai";
import { ChangeEvent, useCallback, useMemo } from "react";

import { FieldProps, type UseOptionsProps, useFieldProps } from "..";
import type { ZodField, ZodFieldValue } from "../../fields";

/**
 * This restricts ZodField to have optional schema defaulting to 'undefined of required schema'.
 */
export type SelectField = ZodField<any>;

export type SelectFieldProps<
  Option,
  Field extends SelectField,
> = UseSelectFieldProps<Option, Field> & FieldProps<Field>;

export type UseSelectFieldProps<Option, Field extends SelectField> = {
  field: Field;
  getValue: (option: Option) => NonNullable<ZodFieldValue<Field>>;
} & Pick<UseOptionsProps<Option>, "options">;

/**
 * When field is empty, we map the undefined from data layer to -1 on presentation (UI) layer.
 */
export const EMPTY_SELECT_VALUE = -1;

export const useSelectFieldProps = <Option, Field extends SelectField>(
  { field, options, getValue }: UseSelectFieldProps<Option, Field>,
  fieldOptions?: UseFieldOptions<ZodFieldValue<Field>>,
) => {
  const atom = useAtomValue(field);
  const fieldValue = useAtomValue(atom.value);
  // TODO: getValue should be useMemo dependency, currently we asume that it is stable
  const values = useMemo(() => options.map(getValue), [options]);
  const value = useMemo(() => values.indexOf(fieldValue), [fieldValue, values]);

  const getEventValue = useCallback(
    (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { value } = event.currentTarget;
      const index = parseInt(value);
      const activeValue = values[index];

      return activeValue as ZodFieldValue<Field>;
    },
    [values],
  );

  const props = useFieldProps<Field, HTMLSelectElement | HTMLInputElement>(
    field,
    getEventValue,
    fieldOptions,
  );

  return { ...props, value };
};
