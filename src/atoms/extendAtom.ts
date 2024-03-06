import { Atom, Getter, PrimitiveAtom, atom } from "jotai";

export const extendAtom = <
  T extends PrimitiveAtom<any>,
  E extends Record<string, unknown>,
>(
  baseAtom: T,
  makeAtoms: (
    cfg: T extends Atom<infer Config> ? Config : never,
    get: Getter,
  ) => E,
) => {
  const extended = atom(
    (get) => {
      const base = get(baseAtom);
      return {
        ...base,
        ...makeAtoms(
          base as T extends Atom<infer Config> ? Config : never,
          get,
        ),
      };
    },
    (get, set, update: T extends Atom<infer Config> ? Config : never) => {
      set(baseAtom, { ...get(baseAtom), ...update });
    },
  );

  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
    baseAtom.debugPrivate = true;
    extended.debugLabel = baseAtom.debugLabel;
  }

  return extended;
};
