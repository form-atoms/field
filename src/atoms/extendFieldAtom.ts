import { FieldAtom } from "form-atoms";
import { Atom, atom } from "jotai";

export type ExtendFieldAtom<Value, State> = FieldAtom<Value> extends Atom<
  infer DefaultState
>
  ? Atom<DefaultState & State>
  : never;

export const extendFieldAtom = <
  T extends FieldAtom<any>,
  E extends Record<string, unknown>,
>(
  field: T,
  atoms: E,
) =>
  atom((get) => {
    const base = get(field);
    return { ...base, ...atoms };
  });
