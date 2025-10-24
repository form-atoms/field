import { act, renderHook } from "@testing-library/react";
import {
  formAtom,
  useFieldActions,
  useFieldErrors,
  useFormSubmit,
  useFormValues,
} from "form-atoms";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { arrayField } from "./arrayField";
import { useFieldError } from "../../hooks";

const elementSchema = z.string();

describe("arrayField()", () => {
  it("is initialized as an empty array", () => {
    const classic = arrayField({ elementSchema });
    const explicitUndefined = arrayField({ elementSchema, value: undefined });

    const form = formAtom({ classic, explicitUndefined });
    const { result } = renderHook(() => useFormValues(form));

    expect(result.current).toEqual({
      classic: [],
      explicitUndefined: [],
    });
  });

  describe("when required", () => {
    it("doesn't submit empty and shows required error", async () => {
      const field = arrayField({
        elementSchema,
        required_error: "This field is required",
      });
      const form = formAtom({ field });
      const { result: submit } = renderHook(() => useFormSubmit(form));

      const onSubmit = vi.fn();
      await act(async () => {
        submit.current(onSubmit)();
      });

      expect(onSubmit).not.toHaveBeenCalled();

      const { result: error } = renderHook(() => useFieldError(field));
      expect(error.current.error).toBe("This field is required");
    });
  });

  describe("schema", () => {
    it("extends the internal schema", async () => {
      const field = arrayField({
        elementSchema: z.number(),
        value: [1, 2, 3],
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
