import {
  SelectField,
  UseOptionProps,
  UseSelectFieldProps,
  useOptions,
  useSelectFieldProps,
} from "../../hooks";

export type RadioGroupProps<Option, Field extends SelectField> = Omit<
  UseOptionProps<Option>,
  "field"
> &
  UseSelectFieldProps<Option, Field>;

export const RadioGroup = <Option, Field extends SelectField>({
  field,
  options,
  getValue,
  getLabel,
}: RadioGroupProps<Option, Field>) => {
  /**
   * ref for multiple inputs not needed.
   */
  const { ref, ...props } = useSelectFieldProps({ field, options, getValue });

  const { renderOptions } = useOptions({ field, options, getLabel });

  return (
    <>
      {renderOptions.map(({ id, value, label }) => (
        <div key={id}>
          <input
            {...props}
            type="radio"
            id={id}
            value={value}
            checked={props.value === value}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      ))}
    </>
  );
};
