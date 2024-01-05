import { formAtom } from "form-atoms";
import { expectTypeOf, test } from "vitest";

import { listField } from "./listField";
import { FormSubmitValues } from "../../components/form";
import { numberField } from "../number-field";

test("required listField has '[itemType, ...itemType[]]' submit value", () => {
  const form = formAtom({
    field: listField({
      value: [],
      builder: (value) => numberField({ value }),
    }),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: [number, ...number[]];
  }>();
});

test("optional listField has 'itemType[]' submit value", () => {
  const form = formAtom({
    field: listField({
      value: [],
      builder: (value) => numberField({ value }),
    }).optional(),
  });

  expectTypeOf<FormSubmitValues<typeof form>>().toEqualTypeOf<{
    field: number[];
  }>();
});
