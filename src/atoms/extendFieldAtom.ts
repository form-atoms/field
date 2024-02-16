import { FieldAtom } from "form-atoms";
import { Atom, atom } from "jotai";

export type ExtendFieldAtom<Value, State> =
  FieldAtom<Value> extends Atom<infer DefaultState>
    ? Atom<DefaultState & State>
    : never;

export type ExtendFormAtom<Fields, State> =
  FieldAtom<Fields> extends Atom<infer DefaultState>
    ? Atom<DefaultState & State>
    : never;

export const extendFieldAtom = <
  T extends Atom<any>,
  E extends Record<string, unknown>,
>(
  field: T,
  makeAtoms: (cfg: T extends Atom<infer Config> ? Config : never) => E,
) =>
  atom((get) => {
    const base = get(field);
    return {
      ...base,
      ...makeAtoms(base as T extends Atom<infer Config> ? Config : never),
    };
  });
