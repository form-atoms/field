import { act, renderHook } from "@testing-library/react";
import { useFieldActions, useFieldErrors } from "form-atoms";
import { describe, expect, it } from "vitest";

import { stringField } from "./stringField";

describe("stringField()", () => {
  describe("schema", () => {
    it("extends the internal schema", async () => {
      const field = stringField({
        value: "bad@email",
        schema: (s) => s.email(),
      });

      const { result: actions } = renderHook(() => useFieldActions(field));
      const { result: errors } = renderHook(() => useFieldErrors(field));

      await act(async () => actions.current.validate());
      expect(errors.current).toEqual(["Invalid email"]);
    });
  });
});
