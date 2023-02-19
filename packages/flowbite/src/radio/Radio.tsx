import {
  FieldProps,
  ValidatedFieldAtom,
  useCheckboxFieldProps,
  useRequiredActions,
  useRequiredProps,
} from "@form-atoms/field";
import { HelperText, Label, Radio } from "flowbite-react";
import { useFieldActions } from "form-atoms";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

import { RadioControlAtom } from "./RadioControl";
import { useFieldError } from "../hooks";

export const RadioField = <Field extends ValidatedFieldAtom<boolean>>({
  field,
  control,
  required,
  label,
  helperText,
}: FieldProps<Field> & {
  control: RadioControlAtom;
}) => {
  const id = `${field}`;
  const props = useCheckboxFieldProps(field);
  const actions = useFieldActions(field);
  const requiredActions = useRequiredActions(field);
  const { error } = useFieldError(field);
  const { isFieldRequired, ...requiredProps } = useRequiredProps(
    field,
    required
  );
  const [radioAtom, setRadioControl] = useAtom(control);
  const radioAtomRef = useRef(radioAtom);

  /**
   * When radio is checked, signal to the control, so the others radios will uncheck.
   */
  useEffect(() => {
    if (props.checked) {
      setRadioControl(field);
    }
  }, [props.checked]);

  useEffect(() => {
    /**
     * Make radios required when none is active, or optional when some is active.
     */
    requiredActions.setRequired(!radioAtom);

    /**
     * When the control changed, check/uncheck self and.
     */
    if (radioAtom) {
      actions.setValue(field === radioAtom);
    }

    radioAtomRef.current = radioAtom;
  }, [radioAtom]);

  /**
   * Given the array field is stable rendered in list via it's atomKey,
   * the effect cleanup callback can be called only when we destroy this item.
   */
  useEffect(() => {
    return () => {
      if (radioAtomRef.current === field) {
        setRadioControl(undefined);
      }
    };
  }, []);

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
