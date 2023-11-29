import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useOptions } from "./useOptions";
import { booleanField } from "../../fields";

describe("useOptions()", () => {
  it("scopes the option ids by the fieldId", () => {
    const field = booleanField();

    const { result } = renderHook(() =>
      useOptions({
        field,
        options: [false, true],
        getLabel: (yes) => (yes ? "yes" : "no"),
      }),
    );

    const fieldId = `${field}`;

    expect(result.current.renderOptions).toEqual([
      { id: `${fieldId}/0`, value: 0, label: "no" },
      { id: `${fieldId}/1`, value: 1, label: "yes" },
    ]);
  });
});
