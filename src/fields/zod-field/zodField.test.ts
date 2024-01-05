import { act, renderHook } from "@testing-library/react";
import { useFieldActions } from "form-atoms";
import { describe, expect, test } from "vitest";
import { z } from "zod";

import { zodField } from "./zodField";
import { useRequiredProps } from "../../hooks";

describe("zodField", () => {
  describe("optional()", () => {
    test("returns the same field when calling optional", () => {
      const field = zodField({
        value: undefined,
        schema: z.number(),
      }).optional();

      const fieldRef = field.optional().optional();

      expect(fieldRef).toEqual(field);
    });
  });

  describe("callback argument", () => {
    test("enables the optional field to be conditionally required", () => {
      const accountType = zodField({ value: "personal", schema: z.string() });
      const vatNumber = zodField({ value: "", schema: z.string() }).optional(
        (get) => get(get(accountType).value) === "business",
      );

      const requiredProps = renderHook(() =>
        useRequiredProps({ field: vatNumber }),
      );

      expect(requiredProps.result.current.required).toBe(false);

      const customerActions = renderHook(() => useFieldActions(accountType));

      act(() => customerActions.result.current.setValue("business"));

      expect(requiredProps.result.current.required).toBe(true);
    });
  });
});
