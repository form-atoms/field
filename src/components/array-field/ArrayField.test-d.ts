import { expectTypeOf } from "vitest";

import { ArrayFieldProps } from "./ArrayField";
import { NumberField, numberField } from "../../fields";

test("builder prop constructs items on the specified path", () => {
  const nested = { addresses: [{ people: [{ age: numberField() }] }] };

  expectTypeOf<
    ArrayFieldProps<typeof nested, ["addresses", 0, "people"]>
  >().toMatchTypeOf<{ builder: () => { age: NumberField } }>();
});
