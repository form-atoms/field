import { act, renderHook } from "@testing-library/react";
import {
  formAtom,
  useFieldActions,
  useFieldErrors,
  useFormValues,
} from "form-atoms";
import { describe, expect, it } from "vitest";
import { z } from "zod";

import { arrayField } from "./arrayField";

const elementSchema = z.string();

describe("arrayField()", () => {
  it("is initialized as empty string", () => {
    const classic = arrayField({ elementSchema });
    const explicitUndefined = arrayField({ elementSchema, value: undefined });

    const form = formAtom({ classic, explicitUndefined });
    const { result } = renderHook(() => useFormValues(form));

    expect(result.current).toEqual({
      classic: [],
      explicitUndefined: [],
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
        "Array must contain at most 2 element(s)",
      ]);
    });
  });
});
