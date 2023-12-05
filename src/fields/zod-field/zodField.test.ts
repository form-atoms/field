import { act, renderHook } from "@testing-library/react";
import { useFieldActions } from "form-atoms";
import { describe, expect, test } from "vitest";

import { useRequiredProps } from "../../hooks";
import { stringField } from "../string-field";

describe("zodField", () => {
  describe(".optional(readRequired)", () => {
    test("it makes the required field state depend on other atoms", () => {
      const customerType = stringField({ value: "personal" });

      const vatNumber = stringField().optional(
        (get) => get(get(customerType).value) === "business",
      );

      const requiredProps = renderHook(() =>
        useRequiredProps({ field: vatNumber }),
      );

      expect(requiredProps.result.current.required).toBe(false);

      const customerActions = renderHook(() => useFieldActions(customerType));

      act(() => customerActions.result.current.setValue("business"));

      expect(requiredProps.result.current.required).toBe(true);
    });
  });
});
