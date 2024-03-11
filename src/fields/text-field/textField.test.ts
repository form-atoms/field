import { act, renderHook } from "@testing-library/react";
import {
  formAtom,
  useFieldActions,
  useFieldErrors,
  useFormValues,
} from "form-atoms";
import { describe, expect, it } from "vitest";

import { textField } from "./textField";

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
