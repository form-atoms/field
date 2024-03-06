import { ListAtom } from "@form-atoms/list-atom";
import { formAtom } from "form-atoms";
import { expectTypeOf, test } from "vitest";

import { ListField, listField } from "./listField";
import { FormSubmitValues } from "../../components/form";
import { NumberField, numberField } from "../number-field";

// test("required listField has '[itemType, ...itemType[]]' submit value", () => {
//   const form = formAtom({
//     field: listField({
//       value: [],
//       fields: ({ age }) => ({ age: numberField({ value: age }) }),
//     }),
//   });

//   expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
//     field: [{ age: number }, ...{ age: number }[]];
//   }>();
// });

test("ListField is assignable to ListAtom", () => {
  type Fields = { age: NumberField };

  expectTypeOf<
    ListField<Fields, { age: number }> extends ListAtom<Fields, { age: number }>
      ? true
      : false
  >().toEqualTypeOf<true>();
});

test("optional listField has 'itemType[]' submit value", () => {
  const form = formAtom({
    field: listField({
      value: [],
      fields: ({ age }) => ({ age: numberField({ value: age }) }),
    }).optional(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: { age: number }[];
  }>();
});
