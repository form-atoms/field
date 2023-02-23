import { MouseEventHandler, ReactNode, useCallback } from "react";
import { RenderProp } from "react-render-prop-type";

import { ValidatedFieldAtom } from ".";

type Children = RenderProp<{
  children: ReactNode;
  htmlFor: string;
  onMouseDown: MouseEventHandler;
}>;

type FieldLabelProps<Field extends ValidatedFieldAtom<any>> = {
  field: Field;
  label: ReactNode;
} & Partial<Children>;

export const FieldLabel = <Field extends ValidatedFieldAtom<any>>({
  field,
  label,
  children = (props) => <label {...props} />,
}: FieldLabelProps<Field>) => {
  const onMouseDown: MouseEventHandler = useCallback((event) => {
    // prevent text selection when double clicking label
    if (!event.defaultPrevented) {
      event.preventDefault();
    }
  }, []);

  return children({
    htmlFor: `${field}`,
    onMouseDown,
    children: label,
  });
};
