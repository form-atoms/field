import { ZodFieldValue } from "../../fields";
import {
  OptionField,
  UseOptionProps,
  useOptionFieldProps,
  useOptions,
} from "../../hooks";

export type RadioGroupProps<Option, Field extends OptionField> = {
  field: Field;
} & UseOptionProps<Option, ZodFieldValue<Field>>;

export const RadioGroup = <Option, Field extends OptionField>({
  field,
  getValue,
  getLabel,
  options,
}: RadioGroupProps<Option, Field>) => {
  /**
   * ref for multiple inputs not needed.
   */
  const { ref, ...props } = useOptionFieldProps(field);

  const { renderOptions } = useOptions({ field, getValue, getLabel, options });

  return (
    <>
      {renderOptions.map(({ id, value, label, checked }) => (
        <div key={id}>
          <input
            {...props}
            type="radio"
            id={id}
            value={value}
            checked={checked}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      ))}
    </>
  );
};
