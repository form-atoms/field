import { formAtom } from "form-atoms";
import { expectTypeOf, test } from "vitest";

import { textField } from "./textField";
import { FormSubmitValues } from "../../components/form";

// could be stricter? e.g. matching pattern by min length
test("required textField has 'string' submit value", () => {
  const form = formAtom({
    field: textField(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: string;
  }>();
});

test("optional textField has 'string' submit value", () => {
  const form = formAtom({
    field: textField().optional(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: string;
  }>();
});
