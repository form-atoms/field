import { expectTypeOf, test } from "vitest";

import type { FormFieldSubmitValues } from "../../components/form";
import type { NumberField } from "./numberField";

test("required numberField has 'number' submit value", () => {
  expectTypeOf<FormFieldSubmitValues<{ field: NumberField }>>().toEqualTypeOf<{
    field: number;
  }>();
});

test("optional numberField has 'number | undefined' submit value", () => {
  expectTypeOf<
    FormFieldSubmitValues<{ field: ReturnType<NumberField["optional"]> }>
  >().toEqualTypeOf<{
    field: number | undefined;
  }>();
});
