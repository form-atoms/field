import { render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { useTextFieldProps } from "./useTextFieldProps";
import { textField } from "../../fields";

describe("useTextFieldProps()", () => {
  it("initializes the field via options", async () => {
    const field = textField();

    const { result: props } = renderHook(() =>
      useTextFieldProps(field, { initialValue: "hello" }),
    );

    expect(props.current.value).toBe("hello");
  });

  it("reads value as string", async () => {
    const field = textField();

    const { result: props } = renderHook(() => useTextFieldProps(field));
    render(<input {...props.current} />);

    await userEvent.type(screen.getByRole("textbox"), "x");

    expect(props.current.value).toBe("x");
  });
});
