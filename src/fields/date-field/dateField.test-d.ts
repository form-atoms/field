import { expectTypeOf, test } from "vitest";

import type { FormFieldSubmitValues } from "../../components/form";
import type { DateField } from "./dateField";

test("required dateField has 'Date' submit value", () => {
  expectTypeOf<FormFieldSubmitValues<{ field: DateField }>>().toEqualTypeOf<{
    field: Date;
  }>();
});

test("optional dateField has 'Date | undefined' submit value", () => {
  expectTypeOf<
    FormFieldSubmitValues<{ field: ReturnType<DateField["optional"]> }>
  >().toEqualTypeOf<{
    field: Date | undefined;
  }>();
});
