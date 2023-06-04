import { formAtom } from "form-atoms";
import { expectTypeOf } from "vitest";

import { filesField } from "./filesField";
import { FormSubmitValues } from "../zod-field/zodField";

test("required filesField has '[File, ...File[]]' submit value", () => {
  const form = formAtom({
    field: filesField(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: [File, ...File[]];
  }>();
});

test("optional filesField has 'File[]' submit value", () => {
  const form = formAtom({
    field: filesField().optional(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: File[];
  }>();
});
