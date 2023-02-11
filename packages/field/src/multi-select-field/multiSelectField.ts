import { z } from "zod";
import {
  validatedFieldAtom,
  ValidatedFieldAtom,
  ValidatedFieldAtomConfig,
} from "../field";

export type MultiSelectFieldAtom<Value = string> = ValidatedFieldAtom<Value[]>;

// TODO: likely rename to multichoice
export function multiSelectField<Value = string>(
  config: Partial<ValidatedFieldAtomConfig<Value[]>> = {}
) {
  return validatedFieldAtom({
    value: [],
    schema: z.array(z.string()).nonempty("This field is required"),
    ...config,
  });
}
