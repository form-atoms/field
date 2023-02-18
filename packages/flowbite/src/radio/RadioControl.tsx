import { ValidatedFieldAtom, selectField } from "@form-atoms/field";
import { useMemo } from "react";
import { RenderProp } from "react-render-prop-type";

export const RadioControl = ({
  name,
  children,
}: { name: string } & RenderProp<{ control: ValidatedFieldAtom<string> }>) => {
  /**
   * Field to keep track of currently active radio option.
   * This field is private and should not be passed to useForm().
   */
  const control = useMemo(() => selectField({ name }), [name]);

  return children({ control });
};
