import { act, renderHook } from "@testing-library/react";
import { formAtom, useFormSubmit, useFormValues } from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { checkboxField } from "./checkboxField";

describe("checkboxField()", () => {
  it("is initialized as false boolean", () => {
    const classic = checkboxField();
    const explicitUndefined = checkboxField({ value: undefined });

    const form = formAtom({ classic, explicitUndefined });
    const { result } = renderHook(() => useFormValues(form));

    expect(result.current).toEqual({
      classic: false,
      explicitUndefined: false,
    });
  });

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
