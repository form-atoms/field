import { act, renderHook } from "@testing-library/react";
import { useFieldActions, useFieldErrors } from "form-atoms";
import { describe, expect, it } from "vitest";

import { numberField } from "./numberField";

describe("numberField()", () => {
  describe("schema", () => {
    it("extends the internal schema", async () => {
      const field = numberField({
        value: 9,
        schema: (s) => s.max(6),
      });

      const { result: actions } = renderHook(() => useFieldActions(field));
      const { result: errors } = renderHook(() => useFieldErrors(field));

      await act(async () => actions.current.validate());
      expect(errors.current).toEqual([
        "Number must be less than or equal to 6",
      ]);
    });
  });
});
