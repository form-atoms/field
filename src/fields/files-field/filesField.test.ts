import { act, renderHook } from "@testing-library/react";
import {
  formAtom,
  useFieldActions,
  useFieldErrors,
  useFormSubmit,
  useFormValues,
} from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { filesField } from "./filesField";
import { useFieldError } from "../../hooks";

describe("filesField()", () => {
  it("is initialized as empty array", () => {
    const classic = filesField();
    const explicitUndefined = filesField({ value: undefined });

    const form = formAtom({ classic, explicitUndefined });
    const { result } = renderHook(() => useFormValues(form));

    expect(result.current).toEqual({
      classic: [],
      explicitUndefined: [],
    });
  });

  describe("when required", () => {
    it("doesn't submit empty", async () => {
      const field = filesField({ required_error: "Files are required" });
      const form = formAtom({ field });
      const { result: submit } = renderHook(() => useFormSubmit(form));

      const onSubmit = vi.fn();
      await act(async () => {
        submit.current(onSubmit)();
      });

      expect(onSubmit).not.toHaveBeenCalled();

      const { result: error } = renderHook(() => useFieldError(field));
      expect(error.current.error).toBe("Files are required");
    });
  });

  describe("schema", () => {
    it("extends the internal schema", async () => {
      const field = filesField({
        value: [
          new File(["logo"], "logo.jpeg", { type: "image/jpeg" }),
          new File(["img"], "img.jpeg", { type: "image/jpeg" }),
          new File(["avatar"], "avatar.jpeg", { type: "image/jpeg" }),
        ],
        schema: (s) => s.max(2),
      });

      const { result: actions } = renderHook(() => useFieldActions(field));
      const { result: errors } = renderHook(() => useFieldErrors(field));

      await act(async () => actions.current.validate());
      expect(errors.current).toEqual([
        "Too big: expected array to have <=2 items",
      ]);
    });
  });
});
