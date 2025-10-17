import { expectTypeOf, test } from "vitest";

import type { FormFieldSubmitValues } from "../../components/form";
import type { BooleanField } from "./booleanField";

test("required booleanField has 'boolean' submit value", () => {
  expectTypeOf<FormFieldSubmitValues<{ field: BooleanField }>>().toEqualTypeOf<{
    field: boolean;
  }>();
});

test("optional booleanField has 'boolean | undefined' submit value", () => {
  expectTypeOf<
    FormFieldSubmitValues<{ field: ReturnType<BooleanField["optional"]> }>
  >().toEqualTypeOf<{
    field: boolean | undefined;
  }>();
});
