import { expectTypeOf, test } from "vitest";

import type { FormFieldSubmitValues } from "../../components/form";

import type { StringField } from "./stringField";

test("required stringField has 'string' submit value", () => {
  expectTypeOf<FormFieldSubmitValues<{ field: StringField }>>().toEqualTypeOf<{
    field: string;
  }>();
});

test("optional stringField has 'string | undefined' submit value", () => {
  expectTypeOf<
    FormFieldSubmitValues<{ field: ReturnType<StringField["optional"]> }>
  >().toEqualTypeOf<{
    field: string | undefined;
  }>();
});
