import { FieldAtom, useFieldState } from "form-atoms";
import { OptionHTMLAttributes, ReactNode, useMemo } from "react";

// The same as InputHTMLAttributes
type HTMLOptionValue = OptionHTMLAttributes<HTMLOptionElement>["value"];

// We provide support for boolean values by having custom serialization
export type OptionValue = HTMLOptionValue | boolean;

export type UseOptionProps<
  Option,
  FieldValue extends OptionValue,
  TOptionValue extends OptionValue = FieldValue
> = {
  field: FieldAtom<FieldValue>;
  getValue: (option: Option) => TOptionValue;
  getLabel: (option: Option) => ReactNode;
  isChecked?: (optionValue: TOptionValue, fieldValue: FieldValue) => boolean;
  options: readonly Option[];
};

// TODO: could be renamed to useRadioOptions, given the strict HTMLValue type
export function useOptions<
  Option,
  FieldValue extends OptionValue,
  TOptionValue extends OptionValue = FieldValue
>({
  field,
  getValue,
  getLabel,
  // @ts-expect-error no problem to compare option with field for most cases
  isChecked = (optionValue, fieldValue) => optionValue === fieldValue,
  options,
}: UseOptionProps<Option, FieldValue, TOptionValue>) {
  const { value } = useFieldState(field);

  return useMemo(
    () => ({
      renderOptions: options.map((option) => {
        const optionValue = getValue(option);

        return {
          id: `${field}/${optionValue}`,
          value: serializeValue(optionValue),
          checked: isChecked(optionValue, value),
          label: getLabel(option),
        };
      }),
    }),
    [options, value, getValue, getLabel]
  );
}

/**
 * Serialize to string, with special handling of boolean to truthy/falsy value.
 * Deserialization:
 * z.coerce.boolean().parse("1") // true
 * z.coerce.boolean().parse("") // false
 */
export const serializeValue = <Val extends OptionValue>(value: OptionValue) =>
  typeof value === "boolean" ? (value ? "1" : "") : value;
