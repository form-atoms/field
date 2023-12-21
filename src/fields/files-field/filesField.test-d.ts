import { formAtom } from "form-atoms";
import { expectTypeOf, test } from "vitest";

import { filesField } from "./filesField";
import { FormSubmitValues } from "../../components/form";
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
    // TODO: narrow
    field: [File, ...File[]] | File[];
  }>();
});
