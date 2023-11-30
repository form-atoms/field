import { expectTypeOf, test } from "vitest";

import { listFieldBuilder } from "./listFieldBuilder";
import { textField } from "../../fields";

test("listFieldBuilder - cannot build with random data", () => {
  const addressBuilder = listFieldBuilder(({ street }) => ({
    street: textField({ name: "street", value: street }),
  }));

  expectTypeOf(addressBuilder).toBeCallableWith([{ street: "foo" }]);

  // Doesnt work for no-argument (due to function overload)
  // https://github.com/mmkal/expect-type/issues/30
  // expectTypeOf(addressBuilder).toBeCallableWith();

  // TODO: expect-type issue
  // expectTypeOf(addressBuilder).not.toBeCallableWith([{ notStreet: "foo" }]);
});
