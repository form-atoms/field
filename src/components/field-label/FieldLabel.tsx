import { FieldAtom } from "form-atoms";
import { MouseEventHandler, ReactNode, useCallback } from "react";
import { RenderProp } from "react-render-prop-type";

type Children = RenderProp<{
  children: ReactNode;
  htmlFor: string;
  onMouseDown: MouseEventHandler;
}>;

type FieldLabelProps<Field extends FieldAtom<any>> = {
  field: Field;
  label: ReactNode;
} & Partial<Children>;

/**
 * Renders an accessible label controlling the field's input.
 */
export const FieldLabel = <Field extends FieldAtom<any>>({
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
