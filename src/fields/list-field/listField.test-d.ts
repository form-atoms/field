import { expectTypeOf, test } from "vitest";

import type { ListAtom } from "@form-atoms/list-atom";
import type { FormFieldSubmitValues } from "../../components/form";
import type { ListField } from "./listField";
import type { NumberField } from "../number-field";

test("ListField is assignable to ListAtom", () => {
  type Fields = { age: NumberField };

  expectTypeOf<
    ListField<Fields> extends ListAtom<Fields> ? true : false
  >().toEqualTypeOf<true>();
});

// test("required listField has '[itemType, ...itemType[]]' submit value", () => {
//   expectTypeOf<
//     FormFieldSubmitValues<{ field: ListField<{ age: NumberField }> }>
//   >().toEqualTypeOf<{
//     field: [{ age: number }, ...{ age: number }[]];
//   }>();
// });

test("optional listField has 'itemType[]' submit value", () => {
  expectTypeOf<
    FormFieldSubmitValues<{
      field: ReturnType<ListField<{ age: NumberField }>["optional"]>;
    }>
  >().toEqualTypeOf<{
    field: { age: number }[];
  }>();
});
