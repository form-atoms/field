import { describe, expectTypeOf, test } from "vitest";

import { listBuilder } from "./listBuilder";
import { type TextField, textField } from "../../fields";

describe("listBuilder", () => {
  describe("when building list of primitive atoms", () => {
    const positivesBuilder = listBuilder((positive) =>
      textField({ name: "positive", value: positive }),
    );

    test("empty call produces single item", () => {
      const single = positivesBuilder();

      expectTypeOf(single).toEqualTypeOf<TextField>();
    });

    test("call with array produces list of items", () => {
      // NOTE: the undefined is simply empty value
      const single = positivesBuilder(["pretty", "fast"]);

      expectTypeOf(single).toEqualTypeOf<TextField[]>();
    });
  });

  describe("when building list of form fields", () => {
    const addressBuilder = listBuilder(({ street }) => ({
      street: textField({ name: "street", value: street }),
    }));

    test("cannot build with random data", () => {
      expectTypeOf(addressBuilder).toBeCallableWith([{ street: "foo" }]);

      // Doesnt work for no-argument (due to function overload)
      // https://github.com/mmkal/expect-type/issues/30
      // expectTypeOf(addressBuilder).toBeCallableWith();

      // TODO: expect-type issue
      // expectTypeOf(addressBuilder).not.toBeCallableWith([{ notStreet: "foo" }]);
    });

    test("empty call produces single item", () => {
      const single = addressBuilder();

      expectTypeOf(single).toEqualTypeOf<{ street: TextField }>();
    });

    test("call with array produces list of items", () => {
      // NOTE: the undefined is simply empty value
      const multi = addressBuilder([{ street: "Hrad" }]);

      expectTypeOf(multi).toEqualTypeOf<{ street: TextField }[]>();
    });
  });
});
