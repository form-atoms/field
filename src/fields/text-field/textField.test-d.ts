import { expectTypeOf, test } from "vitest";

import type { FormFieldSubmitValues } from "../../components/form";
import type { TextField } from "./textField";

// could be stricter? e.g. matching pattern by min length
test("required textField has 'string' submit value", () => {
  expectTypeOf<FormFieldSubmitValues<{ field: TextField }>>().toEqualTypeOf<{
    field: string;
  }>();
});

test("optional textField has 'string' submit value", () => {
  expectTypeOf<
    FormFieldSubmitValues<{ field: ReturnType<TextField["optional"]> }>
  >().toEqualTypeOf<{
    field: string;
  }>();
});
