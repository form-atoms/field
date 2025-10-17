import { expectTypeOf, test } from "vitest";

import type { FormFieldSubmitValues } from "../../components/form";
import type { CheckboxField } from "./checkboxField";

test("required checkboxField has 'true' submit value", () => {
  expectTypeOf<
    FormFieldSubmitValues<{ field: CheckboxField }>
  >().toEqualTypeOf<{
    field: true;
  }>();
});

test("optional checkboxField has 'boolean' submit value", () => {
  expectTypeOf<
    FormFieldSubmitValues<{ field: ReturnType<CheckboxField["optional"]> }>
  >().toEqualTypeOf<{
    field: boolean;
  }>();
});
