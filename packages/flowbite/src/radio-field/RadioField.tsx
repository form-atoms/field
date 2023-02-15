import {
  SelectFieldProps,
  useSelectFieldProps,
  useSelectOptions,
} from "@form-atoms/field";
import { HelperText, Label, Radio } from "flowbite-react";

import { FlowbiteField } from "../field";

export const RadioField = <Option,>({
  field,
  options,
  getValue,
  getLabel,
  label,
  helperText,
  required,
  ...uiProps
}: SelectFieldProps<Option>) => {
  const props = useSelectFieldProps(field);
  const { renderOptions } = useSelectOptions(field, {
    getValue,
    getLabel,
    options,
  });

  return (
    <FlowbiteField
      field={field}
      required={required}
      label={label}
      helperText={helperText}
    >
      {({ color, helperText, id: _, ...fieldProps }) => (
        <>
          {renderOptions.map(({ value, label, isActive }) => (
            <div className="flex items-center gap-2" key={value}>
              <Radio
                {...props}
                role="radio"
                id={value}
                value={value}
                name={props.name ?? props.id}
                checked={isActive}
                aria-checked={isActive}
                {...uiProps}
                {...fieldProps}
              />
              <Label htmlFor={value}>{label}</Label>
            </div>
          ))}
          {helperText && <HelperText color={color}>{helperText}</HelperText>}
        </>
      )}
    </FlowbiteField>
  );
};
