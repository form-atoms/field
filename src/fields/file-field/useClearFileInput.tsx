import { FieldAtom, useFieldValue } from "form-atoms";
import { useEffect } from "react";

import { FileValue } from "./fileField";
import { useClearInputAction } from "..";

/**
 * File input is uncontrolled component. https://reactjs.org/docs/forms.html#the-file-input-tag
 * Reseting a form with dirty file input has no effect.
 * This hook will observe the controlled value, and programatically clear the file input via it's ref when the form is reset.
 */
export const useClearFileFieldEffect = (field: FieldAtom<FileValue>) => {
  const value = useFieldValue(field);
  const { clear } = useClearInputAction(field);

  useEffect(() => {
    // undefined is initial empty value from fileField
    if (value === undefined) {
      clear();
    }
  }, [value]);
};
