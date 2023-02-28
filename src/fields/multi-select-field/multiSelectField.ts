import { z } from "zod";

import {
  ValidatedFieldAtom,
  ValidatedFieldAtomConfig,
  validatedFieldAtom,
} from "..";

export type MultiSelectFieldAtom<Value = string> = ValidatedFieldAtom<Value[]>;

export function multiSelectField<Value = string>(
  config: Partial<ValidatedFieldAtomConfig<Value[]>> = {}
) {
  return validatedFieldAtom({
    value: [],
    schema: config.optional
      ? z.array(z.string()) // TODO: this is static, and should change when required atom is flipped
      : z.array(z.string()).nonempty("This field is required"),
    ...config,
  });
}
