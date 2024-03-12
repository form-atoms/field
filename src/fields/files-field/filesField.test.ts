import { act, renderHook } from "@testing-library/react";
import {
  formAtom,
  useFieldActions,
  useFieldErrors,
  useFormValues,
} from "form-atoms";
import { describe, expect, it } from "vitest";

import { filesField } from "./filesField";

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
        "Array must contain at most 2 element(s)",
      ]);
    });
  });
});
