import { formAtom } from "form-atoms";
import { expectTypeOf, test } from "vitest";

import { booleanField } from "./booleanField";
import { FormSubmitValues } from "../zod-field/zodField";

test("required booleanField has 'boolean' submit value", () => {
  const form = formAtom({
    field: booleanField(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: boolean;
  }>();
});

test("optional booleanField has 'boolean | undefined' submit value", () => {
  const form = formAtom({
    field: booleanField().optional(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: boolean | undefined;
  }>();
});
