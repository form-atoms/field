import { atom } from "jotai";
import { useMemo } from "react";
import { RenderProp } from "react-render-prop-type";

import { ZodField } from "../../fields";

const radioControlAtom = () => atom<ZodField<boolean> | undefined>(undefined);

export type RadioControlAtom = ReturnType<typeof radioControlAtom>;

export const RadioControl = ({
  name,
  children,
}: Partial<{ name: string }> & RenderProp<{ control: RadioControlAtom }>) => {
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
