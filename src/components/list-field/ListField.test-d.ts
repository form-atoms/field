import { expectTypeOf } from "vitest";

import { ListFieldProps } from "./ListField";
import { NumberField, numberField } from "../../fields";

test("builder prop constructs items on the specified path", () => {
  const nested = { addresses: [{ people: [{ age: numberField() }] }] };

  expectTypeOf<
    ListFieldProps<typeof nested, ["addresses", 0, "people"]>
  >().toMatchTypeOf<{ builder: () => { age: NumberField } }>();
});
