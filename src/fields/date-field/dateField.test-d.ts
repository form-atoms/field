import { formAtom } from "form-atoms";
import { expectTypeOf } from "vitest";

import { dateField } from "./dateField";
import { FormSubmitValues } from "../zod-field/zodField";

test("required dateField has 'Date' submit value", () => {
  const form = formAtom({
    field: dateField(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: Date;
  }>();
});

test("optional dateField has 'Date | undefined' submit value", () => {
  const form = formAtom({
    field: dateField().optional(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: Date | undefined;
  }>();
});