import { act, renderHook } from "@testing-library/react";
import { formAtom, useFormSubmit, useFormValues } from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { checkboxField } from "./checkboxField";
import { useFieldError } from "../../hooks";

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
      const field = checkboxField({ required_error: "Check me" });
      const form = formAtom({ field });
      const { result: submit } = renderHook(() => useFormSubmit(form));

      const onSubmit = vi.fn();
      await act(async () => {
        submit.current(onSubmit)();
      });

      expect(onSubmit).not.toHaveBeenCalled();

      const { result: error } = renderHook(() => useFieldError(field));
      expect(error.current.error).toBe("Check me");
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
