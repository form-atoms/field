import { formAtom } from "form-atoms";
import { expectTypeOf } from "vitest";

import { numberField } from "./numberField";
import { FormSubmitValues } from "../zod-field/zodField";

test("required numberField has 'number' submit value", () => {
  const form = formAtom({
    field: numberField(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: number;
  }>();
});

test("optional numberField has 'number | undefined' submit value", () => {
  const form = formAtom({
    field: numberField().optional(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: number | undefined;
  }>();
});
