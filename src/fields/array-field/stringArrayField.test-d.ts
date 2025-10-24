import { expectTypeOf, test } from "vitest";

import { FormFieldSubmitValues } from "../../components/form";

import type { StringArrayField } from "./stringArrayField";

// test.skip("required stringArrayField has '[string, ...string[]]' submit value", () => {
//   expectTypeOf<
//     FormFieldSubmitValues<{ field: StringArrayField }>
//   >().toEqualTypeOf<{
//     field: [string, ...string[]];
//   }>();
// });

test("optional stringArrayField has 'string[]' submit value", () => {
  expectTypeOf<
    FormFieldSubmitValues<{ field: ReturnType<StringArrayField["optional"]> }>
  >().toEqualTypeOf<{
    field: string[];
  }>();
});
