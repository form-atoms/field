import { formAtom } from "form-atoms";
import { expectTypeOf, test } from "vitest";

import { stringArrayField } from "./stringArrayField";
import { FormSubmitValues } from "../../components/form";

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
    // TODO: narrow?
    field: [string, ...string[]] | string[];
  }>();
});
