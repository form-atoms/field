"use client";

import type { FieldAtom } from "form-atoms";
import {
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  useCallback,
} from "react";

type ChildrenProps = PropsWithChildren<{
  htmlFor: string;
  onMouseDown: MouseEventHandler;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldLabelProps<Field extends FieldAtom<any>> = {
  field: Field;
  label: ReactNode;
  children?: (props: ChildrenProps) => React.ReactElement;
};

/**
 * Renders an accessible label controlling the field's input.
 * @deprecated The atomKey is not suitable for input/label pairing as it does not support SSR. Moreover the onMouseDown is UX feature, not a logic concern for a field.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
