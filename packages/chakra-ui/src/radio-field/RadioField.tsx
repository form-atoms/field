import { SelectFieldProps, useSelectOptions } from "@form-atoms/field";
import { useFieldActions, useInputFieldProps } from "form-atoms";
import { ChakraField, ChakraFieldProps } from "../chakra-field";
import { RadioGroup, Radio, Stack } from "@chakra-ui/react";

export const RadioField = <Option,>({
  field,
  options,
  getValue,
  getLabel,
  label,
}: SelectFieldProps<Option> & ChakraFieldProps) => {
  const inputProps = useInputFieldProps(field);
  const { renderOptions } = useSelectOptions(field, {
    getValue,
    getLabel,
    options,
  });
  const actions = useFieldActions(field);

  return (
    <ChakraField field={field} label={label}>
      <RadioGroup
        name={inputProps.name}
        value={inputProps.value}
        onChange={actions.setValue}
        // @ts-ignore
        onBlur={() => inputProps.onBlur()}
      >
        <Stack>
          {renderOptions.map(({ value, label }) => (
            <Radio key={value} value={value}>
              {label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </ChakraField>
  );
};
