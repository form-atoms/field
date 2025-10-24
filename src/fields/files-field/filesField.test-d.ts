import { expectTypeOf, test } from "vitest";

import type { FormFieldSubmitValues } from "../../components/form";
import type { FilesField } from "./filesField";

test("required filesField has '[File, ...File[]]' submit value", () => {
  expectTypeOf<FormFieldSubmitValues<{ field: FilesField }>>().toEqualTypeOf<{
    field: File[];
  }>();
});

test("optional filesField has 'File[]' submit value", () => {
  expectTypeOf<
    FormFieldSubmitValues<{ field: ReturnType<FilesField["optional"]> }>
  >().toEqualTypeOf<{
    field: File[];
  }>();
});
