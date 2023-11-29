import { expectTypeOf, test } from "vitest";

import { ListFieldProps } from "./ListField";
import { NumberField, numberField, textField } from "../../fields";

test("builder prop constructs items on the specified path", () => {
  const nested = { addresses: [{ people: [{ age: numberField() }] }] };

  expectTypeOf<
    ListFieldProps<typeof nested, ["addresses", 0, "people"]>
  >().toMatchTypeOf<{ builder: () => { age: NumberField } }>();
});

test("keyFrom prop must be one of item's fields", () => {
  const fields = {
    contacts: [{ name: textField(), phone: textField() }],
  };

  expectTypeOf<
    ListFieldProps<typeof fields, ["contacts"]>["keyFrom"]
  >().toMatchTypeOf<"name" | "phone">();
});
