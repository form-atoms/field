import { UseFieldOptions } from "form-atoms";

import { useCheckboxGroupFieldProps } from "./useCheckboxGroupProps";
import { ZodArrayField, ZodFieldValue } from "../../fields";
import { FieldProps } from "../use-field-props";
import { type UseMultiSelectFieldProps } from "../use-multiselect-field-props";
import { type UseOptionsProps, useOptions } from "../use-options";

export type CheckboxGroupFieldProps<
  Option,
  Field extends ZodArrayField,
> = FieldProps<Field> & UseCheckboxGroupProps<Option, Field>;

export type UseCheckboxGroupProps<
  Option,
  Field extends ZodArrayField,
> = UseMultiSelectFieldProps<Option, Field> & UseOptionsProps<Option>;

export const useCheckboxGroup = <Option, Field extends ZodArrayField>(
  { field, getValue, getLabel, options }: UseCheckboxGroupProps<Option, Field>,
  fieldOptions?: UseFieldOptions<ZodFieldValue<Field>>,
) => {
  const props = useCheckboxGroupFieldProps(
    { field, options, getValue },
    fieldOptions,
  );

  const { renderOptions } = useOptions({
    field,
    getLabel,
    options,
  });

  // when one option is selected, thats enough for the required multiselect to be filled
  const required = props.value.length === 0 ? props.required : false;

  return renderOptions.map((option) => ({
    ...props,
    ...option,
    type: "checkbox" as const,
    required,
    checked: props.value.includes(option.value),
  }));
};
