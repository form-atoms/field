import { act, renderHook } from "@testing-library/react";
import { useFieldActions, useFieldErrors } from "form-atoms";
import { describe, expect, it } from "vitest";

import { dateField } from "./dateField";

describe("dateField()", () => {
  describe("schema", () => {
    it("extends the internal schema", async () => {
      const field = dateField({
        value: new Date("2000-01-01"),
        schema: (s) =>
          s.max(new Date("1999-12-31"), {
            message: "Date can't be in the 21st century",
          }),
      });

      const { result: actions } = renderHook(() => useFieldActions(field));
      const { result: errors } = renderHook(() => useFieldErrors(field));

      await act(async () => actions.current.validate());
      expect(errors.current).toEqual(["Date can't be in the 21st century"]);
    });
  });
});
