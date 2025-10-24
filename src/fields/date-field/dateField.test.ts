import { act, renderHook } from "@testing-library/react";
import {
  formAtom,
  useFieldActions,
  useFieldErrors,
  useFormSubmit,
} from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { dateField } from "./dateField";
import { useFieldError } from "../../hooks";

describe("dateField()", () => {
  describe("when required", () => {
    it("doesn't submit empty", async () => {
      const field = dateField({ required_error: "Date is required" });
      const form = formAtom({ field });
      const { result: submit } = renderHook(() => useFormSubmit(form));

      const onSubmit = vi.fn();
      await act(async () => {
        submit.current(onSubmit)();
      });

      expect(onSubmit).not.toHaveBeenCalled();

      const { result: error } = renderHook(() => useFieldError(field));
      expect(error.current.error).toBe("Date is required");
    });
  });

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
