import { formAtom } from "form-atoms";
import { expectTypeOf } from "vitest";

import { stringField } from "./stringField";
import { FormSubmitValues } from "../zod-field/zodField";

test("required stringField has 'string' submit value", () => {
  const form = formAtom({
    field: stringField(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: string;
  }>();
});

test("optional stringField has 'string | undefined' submit value", () => {
  const form = formAtom({
    field: stringField().optional(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: string | undefined;
  }>();
});
