import { expectTypeOf, test } from "vitest";

import type { FormFieldSubmitValues } from "../../components/form";
import type { DigitField } from "./digitField";

test("required digitField has '0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9' submit value", () => {
  expectTypeOf<FormFieldSubmitValues<{ field: DigitField }>>().toEqualTypeOf<{
    field: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  }>();
});

test("optional digitField has '0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined' submit value", () => {
  expectTypeOf<
    FormFieldSubmitValues<{ field: ReturnType<DigitField["optional"]> }>
  >().toEqualTypeOf<{
    field: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;
  }>();
});
