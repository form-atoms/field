import { z } from "zod";
import { zodValidate } from "form-atoms/zod";
import { fieldAtom, FieldAtom, FieldAtomConfig } from "form-atoms";

export type MultiSelectFieldAtom<Value = string> = FieldAtom<Value[]>;

type MultiSelectConfig<Value> = Partial<FieldAtomConfig<Value[]>>;

type MultiSelectConfigBuilder<Value> = (zod: {
  zodValidate: typeof zodValidate;
  z: typeof z;
}) => MultiSelectConfig<Value>;

// TODO: likely rename to multichoice
export function multiSelectField<Value = string>(
  config: MultiSelectConfig<Value> | MultiSelectConfigBuilder<Value> = {}
) {
  return fieldAtom({
    value: [],
    validate: zodValidate(
      z.array(z.string()).nonempty("This field is required"),
      { on: "change" }
    ),
    ...(typeof config === "function" ? config({ zodValidate, z }) : config),
  });
}
