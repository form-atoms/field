import { act, renderHook } from "@testing-library/react";
import {
  formAtom,
  useFieldActions,
  useFieldErrors,
  useFormSubmit,
} from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { numberField } from "./numberField";
import { useFieldError } from "../../hooks";

describe("numberField()", () => {
  describe("when required", () => {
    it("doesn't submit empty", async () => {
      const field = numberField({ required_error: "Number is required" });
      const form = formAtom({ field });
      const { result: submit } = renderHook(() => useFormSubmit(form));

      const onSubmit = vi.fn();
      await act(async () => {
        submit.current(onSubmit)();
      });

      expect(onSubmit).not.toHaveBeenCalled();

      const { result: error } = renderHook(() => useFieldError(field));
      expect(error.current.error).toBe("Number is required");
    });
  });

  describe("schema", () => {
    it("extends the internal schema", async () => {
      const field = numberField({
        value: 9,
        schema: (s) => s.max(6),
      });

      const { result: actions } = renderHook(() => useFieldActions(field));
      const { result: errors } = renderHook(() => useFieldErrors(field));

      await act(async () => actions.current.validate());
      expect(errors.current).toEqual(["Too big: expected number to be <=6"]);
    });
  });
});
