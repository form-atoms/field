import { formAtom } from "form-atoms";
import { expectTypeOf } from "vitest";

import { stringArrayField } from "./stringArrayField";
import { FormSubmitValues } from "../zod-field/zodField";

test("required stringArrayField has '[string, ...string[]]' submit value", () => {
  const form = formAtom({
    field: stringArrayField(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: [string, ...string[]];
  }>();
});

test("optional stringArrayField has 'string[]' submit value", () => {
  const form = formAtom({
    field: stringArrayField().optional(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: string[];
  }>();
});
