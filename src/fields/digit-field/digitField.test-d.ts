import { formAtom } from "form-atoms";
import { expectTypeOf, test } from "vitest";

import { digitField } from "./digitField";
import { FormSubmitValues } from "../../components/form";

test("required digitField has '0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9' submit value", () => {
  const form = formAtom({
    field: digitField(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  }>();
});

test("optional digitField has '0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined' submit value", () => {
  const form = formAtom({
    field: digitField().optional(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;
  }>();
});
