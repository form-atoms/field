import { formAtom } from "form-atoms";
import { expectTypeOf, test } from "vitest";

import { dateField } from "./dateField";
import { FormSubmitValues } from "../../components/form";

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
