import { act, renderHook } from "@testing-library/react";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { booleanField } from "./booleanField";

describe("booleanField()", () => {
  describe("when required", () => {
    it("doesn't submit empty", async () => {
      const field = booleanField();
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
    it("submits with undefined empty value", async () => {
      const field = booleanField().optional();
      const form = formAtom({ field });
      const { result } = renderHook(() => useFormSubmit(form));

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ field: undefined });
    });
  });
});
