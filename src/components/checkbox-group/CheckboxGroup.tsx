import { ZodArrayField } from "../../fields";
import { UseCheckboxGroupProps, useCheckboxGroup } from "../../hooks";

export const CheckboxGroup = <Option, Field extends ZodArrayField>({
  field,
  options,
  getValue,
  getLabel,
}: UseCheckboxGroupProps<Option, Field>) => {
  const checkboxGroup = useCheckboxGroup({
    field,
    options,
    getValue,
    getLabel,
  });

  return (
    <>
      {checkboxGroup.map((checkboxProps) => (
        <div key={checkboxProps.id}>
          <input {...checkboxProps} />
          <label htmlFor={checkboxProps.id}>{checkboxProps.label}</label>
        </div>
      ))}
    </>
  );
};
