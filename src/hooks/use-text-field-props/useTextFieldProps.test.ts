import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useTextFieldProps } from "./useTextFieldProps";
import { textField } from "../../fields";

describe("useTextFieldProps()", () => {
  it("initializes the field via options", async () => {
    const field = textField();

    const props = renderHook(() =>
      useTextFieldProps(field, { initialValue: "hello" }),
    );

    expect(props.result.current.value).toBe("hello");
  });
});
