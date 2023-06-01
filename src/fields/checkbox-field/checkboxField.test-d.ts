import { formAtom } from "form-atoms";
import { expectTypeOf } from "vitest";

import { checkboxField } from "./checkboxField";
import { FormSubmitValues } from "../zodField";

test("required checkboxField has 'true' submit value", () => {
  const form = formAtom({
    required: checkboxField(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    required: true;
  }>();
});

test("optional checkboxField has 'boolean' submit value", () => {
  const form = formAtom({
    required: checkboxField().optional(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    required: boolean;
  }>();
});
