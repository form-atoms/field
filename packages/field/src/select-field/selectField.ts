import { z } from "zod";
import { zodValidate } from "form-atoms/zod";
import { fieldAtom, FieldAtom, FieldAtomConfig } from "form-atoms";

export type SelectFieldAtom<Value = string> = FieldAtom<Value | undefined>;

type SelectConfig<Value> = Partial<FieldAtomConfig<Value | undefined>>;

type SelectConfigBuilder<Value> = (zod: {
  zodValidate: typeof zodValidate;
  z: typeof z;
}) => SelectConfig<Value>;

// possibly validate option literals, or union of literals
// https://zod.dev/?id=unions
export function selectField<Value = string>(
  config: SelectConfig<Value> | SelectConfigBuilder<Value> = {}
) {
  return fieldAtom({
    value: undefined,
    validate: zodValidate(
      z.string({ required_error: "This field is required" }),
      { on: "change" }
    ),
    ...(typeof config === "function" ? config({ zodValidate, z }) : config),
  });
}
