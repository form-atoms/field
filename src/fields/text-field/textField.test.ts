import { renderHook } from "@testing-library/react";
import { formAtom, useFormValues } from "form-atoms";
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
});
