import {
  FieldProps,
  ValidatedFieldAtom,
  useCheckboxFieldProps,
  useRequiredProps,
} from "@form-atoms/field";
import { HelperText, Label, Radio } from "flowbite-react";

import { useFieldError } from "../hooks";

export const RadioOption = <Field extends ValidatedFieldAtom<boolean>>({
  field,
  required,
  label,
  helperText,
}: FieldProps<Field>) => {
  const id = `${field}`;
  const props = useCheckboxFieldProps(field);
  const { error } = useFieldError(field);
  const { isFieldRequired, ...requiredProps } = useRequiredProps(
    field,
    required
  );

  return (
    <div className="flex items-center gap-2">
      <Radio {...props} id={id} {...requiredProps} role="radio" />
      <div className="flex flex-col">
        <Label htmlFor={id} color={error ? "failure" : undefined}>
          {label} {isFieldRequired ? "(required)" : ""}
        </Label>
        <HelperText
          className="mt-0 text-xs"
          color={error ? "failure" : undefined}
        >
          {error ?? helperText}
        </HelperText>
      </div>
    </div>
  );
};
