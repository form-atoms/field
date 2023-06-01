import { act, renderHook } from "@testing-library/react";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { checkboxField } from "./checkboxField";

describe("checkboxField()", () => {
  describe("when required", () => {
    it("doesn't submit empty", async () => {
      const field = checkboxField();
      const form = formAtom({ field });
      const { result } = renderHook(() => useFormSubmit(form));

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe("when optional", () => {
    it("submits with false empty value", async () => {
      const field = checkboxField().optional();
      const form = formAtom({ field });
      const { result } = renderHook(() => useFormSubmit(form));

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ field: false });
    });
  });
});
