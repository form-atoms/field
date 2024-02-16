import { FieldAtom } from "form-atoms";
import { Atom, Getter, atom } from "jotai";

export type ExtendFieldAtom<Value, State> =
  FieldAtom<Value> extends Atom<infer DefaultState>
    ? Atom<DefaultState & State>
    : never;

export const extendFieldAtom = <
  T extends Atom<any>,
  E extends Record<string, unknown>,
>(
  field: T,
  makeAtoms: (
    cfg: T extends Atom<infer Config> ? Config : never,
    get: Getter,
  ) => E,
) =>
  atom(
    (get) => {
      const base = get(field);
      return {
        ...base,
        ...makeAtoms(
          base as T extends Atom<infer Config> ? Config : never,
          get,
        ),
      };
    },
    (get, set, update: T extends Atom<infer Config> ? Config : never) => {
      // @ts-expect-error fieldAtom is PrimitiveAtom
      set(field, { ...get(field), ...update });
    },
  );
