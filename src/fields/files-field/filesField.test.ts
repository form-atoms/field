import { renderHook } from "@testing-library/react";
import { formAtom, useFormValues } from "form-atoms";
import { describe, expect, it } from "vitest";

import { filesField } from "./filesField";

describe("filesField()", () => {
  it("is initialized as empty string", () => {
    const classic = filesField();
    const explicitUndefined = filesField({ value: undefined });

    const form = formAtom({ classic, explicitUndefined });
    const { result } = renderHook(() => useFormValues(form));

    expect(result.current).toEqual({
      classic: [],
      explicitUndefined: [],
    });
  });
});
