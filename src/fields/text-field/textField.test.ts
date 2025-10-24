import { act, renderHook } from "@testing-library/react";
import {
  formAtom,
  useFieldActions,
  useFieldErrors,
  useFormSubmit,
  useFormValues,
} from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { textField } from "./textField";
import { useFieldError } from "../../hooks";

describe("textField()", () => {
  it("is initialized as empty string", () => {
    const classic = textField();
    const explicitUndefined = textField({ value: undefined });

    const form = formAtom({ classic, explicitUndefined });
    const { result } = renderHook(() => useFormValues(form));

    expect(result.current).toEqual({
      classic: "",
      explicitUndefined: "",
    });
  });

  describe("when required", () => {
    it("doesn't submit empty", async () => {
      const field = textField({ required_error: "Text is required" });
      const form = formAtom({ field });
      const { result: submit } = renderHook(() => useFormSubmit(form));

      const onSubmit = vi.fn();
      await act(async () => {
        submit.current(onSubmit)();
      });

      expect(onSubmit).not.toHaveBeenCalled();

      const { result: error } = renderHook(() => useFieldError(field));
      expect(error.current.error).toBe("Text is required");
    });
  });

  describe("schema", () => {
    it("extends the internal schema", async () => {
      const field = textField({
        value: "1234567",
        schema: (s) => s.max(6),
      });

      const { result: actions } = renderHook(() => useFieldActions(field));
      const { result: errors } = renderHook(() => useFieldErrors(field));

      await act(async () => actions.current.validate());
      expect(errors.current).toEqual([
        "String must contain at most 6 character(s)",
      ]);
    });
  });
});
