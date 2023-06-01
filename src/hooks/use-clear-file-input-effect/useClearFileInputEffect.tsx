import { FieldAtom, useFieldValue } from "form-atoms";
import { useEffect } from "react";

import { useClearInputAction } from "..";
import { FilesFieldValue } from "../../fields";

/**
 * File input is uncontrolled component. https://reactjs.org/docs/forms.html#the-file-input-tag
 * Reseting a form with dirty file input has no effect.
 * This hook will observe the controlled value, and programatically clear the file input via it's ref when the form is reset.
 */
export const useClearFileInputEffect = (field: FieldAtom<FilesFieldValue>) => {
  const value = useFieldValue(field);
  const { clear } = useClearInputAction(field);

  useEffect(() => {
    // Empty array is initial value for filesField, so we clear input when value becomes 'empty'
    if (value.length === 0) {
      clear();
    }
  }, [value]);
};
