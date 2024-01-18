import { UseFieldOptions } from "form-atoms";

import { ZodArrayField, ZodFieldValue } from "../../fields";
import { UseCheckboxGroupProps, useCheckboxGroup } from "../../hooks";

export type CheckboxGroupProps<
  Option,
  Field extends ZodArrayField,
> = UseCheckboxGroupProps<Option, Field> &
  Pick<UseFieldOptions<ZodFieldValue<Field>>, "initialValue">;

export const CheckboxGroup = <Option, Field extends ZodArrayField>({
  field,
  options,
  getValue,
  getLabel,
  initialValue,
}: CheckboxGroupProps<Option, Field>) => {
  const checkboxGroup = useCheckboxGroup(
    {
      field,
      options,
      getValue,
      getLabel,
    },
    { initialValue },
  );

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
