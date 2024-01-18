import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useNumberFieldProps } from "./useNumberFieldProps";
import { numberField } from "../../fields";

describe("useNumberFieldProps()", () => {
  it("initializes the field via options", async () => {
    const field = numberField();

    const props = renderHook(() =>
      useNumberFieldProps(field, { initialValue: 42 }),
    );

    expect(props.result.current.value).toBe(42);
  });
});
