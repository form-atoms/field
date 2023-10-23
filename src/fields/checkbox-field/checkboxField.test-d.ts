import { formAtom } from "form-atoms";
import { expectTypeOf } from "vitest";

import { checkboxField } from "./checkboxField";
import { FormSubmitValues } from "../zod-field/zodField";

test("required checkboxField has 'true' submit value", () => {
  const form = formAtom({
    field: checkboxField(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: true;
  }>();
});

test("optional checkboxField has 'boolean' submit value", () => {
  const form = formAtom({
    field: checkboxField().optional(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: boolean;
  }>();
});