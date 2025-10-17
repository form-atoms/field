import { useFieldActions, useFieldValue } from "form-atoms";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

import { RadioControlAtom } from "./RadioControl";
import { CheckboxField } from "../../fields";
import { useFieldProps, useRequiredActions } from "../../hooks";

type Props = {
  control: RadioControlAtom;
  field: ReturnType<CheckboxField["optional"]>;
};

const useCheckboxFieldProps = (field: CheckboxField) => {
  const { value, ...props } = useFieldProps(
    field,
    (event) => event.currentTarget.checked,
  );

  return { ...props, checked: value };
};

export const useRadio = ({ control, field }: Props) => {
  const checked = useFieldValue(field);
  const actions = useFieldActions(field);
  const requiredActions = useRequiredActions(field);
  const [radioAtom, setRadioControl] = useAtom(control);
  const radioAtomRef = useRef(radioAtom);

  /**
   * When radio is checked, signal to the control, so the others radios will uncheck.
   */
  useEffect(() => {
    if (checked) {
      setRadioControl(field);
    }
  }, [checked]);

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

  return useCheckboxFieldProps(field);
};

export const Radio = ({
  field,
  control,
  children,
}: Props & {
  children: (
    props: ReturnType<typeof useCheckboxFieldProps>,
  ) => React.ReactNode;
}) => children(useRadio({ control, field }));
