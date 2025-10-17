import { atom } from "jotai";
import { useMemo } from "react";

import { CheckboxField } from "../../fields";

const radioControlAtom = () => atom<CheckboxField | undefined>(undefined);

export type RadioControlAtom = ReturnType<typeof radioControlAtom>;

export const RadioControl = ({
  name,
  children,
}: Partial<{ name: string }> & {
  children: (props: { control: RadioControlAtom }) => React.ReactNode;
}) => {
  /**
   * Atom to keep track of currently active checkbox fieldAtom.
   */
  const control = useMemo(() => {
    const atom = radioControlAtom();
    atom.debugLabel = `radioControl/${name}`;
    return atom;
  }, []);

  return children({ control });
};
