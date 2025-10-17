import { expectTypeOf, test } from "vitest";

import { FormFieldSubmitValues } from "../../components/form";

import type { StringArrayField } from "./stringArrayField";

test("required stringArrayField has '[string, ...string[]]' submit value", () => {
  expectTypeOf<
    FormFieldSubmitValues<{ field: StringArrayField }>
  >().toEqualTypeOf<{
    field: [string, ...string[]];
  }>();
});

test("optional stringArrayField has 'string[]' submit value", () => {
  expectTypeOf<
    FormFieldSubmitValues<{ field: ReturnType<StringArrayField["optional"]> }>
  >().toEqualTypeOf<{
    // TODO: narrow?
    field: [string, ...string[]] | string[];
  }>();
});
