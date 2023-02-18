import {
  FieldProps,
  ValidatedFieldAtom,
  useRequiredActions,
  useRequiredProps,
  useSelectFieldProps,
} from "@form-atoms/field";
import { HelperText, Label, Radio } from "flowbite-react";
import { useFieldActions } from "form-atoms";
import { useEffect, useRef } from "react";

import { useFieldError } from "../hooks";

export const RadioField = <Field extends ValidatedFieldAtom<boolean>>({
  field,
  control,
  required,
  label,
  helperText,
}: FieldProps<Field> & {
  control: ValidatedFieldAtom<string>;
}) => {
  const { value: activeValue, ...props } = useSelectFieldProps(control);
  const value = `${field}`;
  const actions = useFieldActions(field);
  const controlActions = useFieldActions(control);
  const activeValueRef = useRef(activeValue);
  const requiredActions = useRequiredActions(field);

  const { isFieldRequired, ...requiredProps } = useRequiredProps(
    field,
    required
  );

  useEffect(() => {
    activeValueRef.current = activeValue;
  }, [activeValue]);

  useEffect(() => {
    requiredActions.setRequired(!activeValue);

    actions.setValue(value === activeValue);
  }, [activeValue]);

  /**
   * Given the array field is stable rendered in list via some item's atomKey,
   * the effect cleanup callback can be called only when we destroy this item.
   * REF is hacky here, to get access to current select value.
   */
  useEffect(() => {
    return () => {
      if (activeValueRef.current === value) {
        controlActions.setValue(undefined);
      }
    };
  }, []);

  const { error } = useFieldError(control);

  return (
    <div className="flex items-center gap-2">
      <Radio
        {...props}
        id={value}
        value={value}
        {...requiredProps}
        role="radio"
      />
      <div className="flex flex-col">
        <Label htmlFor={value} color={error ? "failure" : undefined}>
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
