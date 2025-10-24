import { act, renderHook } from "@testing-library/react";
import {
  formAtom,
  useFieldActions,
  useFieldErrors,
  useFormSubmit,
} from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { stringField } from "./stringField";
import { useFieldError } from "../../hooks";

describe("stringField()", () => {
  describe("when required", () => {
    it("doesn't submit empty", async () => {
      const field = stringField({ required_error: "String is required" });
      const form = formAtom({ field });
      const { result: submit } = renderHook(() => useFormSubmit(form));

      const onSubmit = vi.fn();
      await act(async () => {
        submit.current(onSubmit)();
      });

      expect(onSubmit).not.toHaveBeenCalled();

      const { result: error } = renderHook(() => useFieldError(field));
      expect(error.current.error).toBe("String is required");
    });
  });

  describe("schema", () => {
    it("extends the internal schema", async () => {
      const field = stringField({
        value: "bad@email",
        schema: (s) => s.email(),
      });

      const { result: actions } = renderHook(() => useFieldActions(field));
      const { result: errors } = renderHook(() => useFieldErrors(field));

      await act(async () => actions.current.validate());
      expect(errors.current).toEqual(["Invalid email address"]);
    });
  });
});
