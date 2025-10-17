import type { Getter, Atom } from "jotai";
import { atomWithDefault } from "jotai/utils";

export const extendAtom = <
  T extends Record<string, unknown>,
  E extends Record<string, unknown>,
>(
  baseAtom: Atom<T>,
  makeAtoms: (cfg: T, get: Getter) => E,
) => {
  const extended = atomWithDefault((get) => {
    const base = get(baseAtom);
    return {
      ...base,
      ...makeAtoms(base, get),
    };
  });

  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
    baseAtom.debugPrivate = true;
    extended.debugLabel = baseAtom.debugLabel;
  }

  return extended;
};
