import { FieldAtom } from "form-atoms";
import { Atom, PrimitiveAtom } from "jotai";

export type ExtendFieldAtom<Value, State> =
  FieldAtom<Value> extends Atom<infer DefaultState>
    ? Atom<DefaultState & State>
    : never;

export type PrimitiveFieldAtom<Value> =
  FieldAtom<Value> extends Atom<infer DefaultState>
    ? PrimitiveAtom<DefaultState>
    : never;
