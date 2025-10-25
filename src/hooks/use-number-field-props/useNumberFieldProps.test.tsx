import { render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useFieldValue } from "form-atoms";
import { describe, expect, it } from "vitest";

import { useNumberFieldProps } from "./useNumberFieldProps";
import { numberField } from "../../fields";

describe("useNumberFieldProps()", () => {
  it("gives number input type", () => {
    const field = numberField();
    const { result } = renderHook(() => useNumberFieldProps(field));

    expect(result.current.type).toBe("number");
  });

  it("initializes the field via options", async () => {
    const field = numberField();

    const { result: props } = renderHook(() =>
      useNumberFieldProps(field, { initialValue: 42 }),
    );

    expect(props.current.value).toBe(42);
  });

  it("reads empty input value as undefined with props.value as empty string", async () => {
    const field = numberField({ value: 10 });

    const { result: props } = renderHook(() => useNumberFieldProps(field));
    const { result: value } = renderHook(() => useFieldValue(field));
    render(<input {...props.current} />);

    expect(props.current.value).toBe(10);
    expect(value.current).toBe(10);

    await userEvent.clear(screen.getByRole("spinbutton"));

    expect(props.current.value).toBe("");
    expect(value.current).toBe(undefined);
  });

  it("reads numeric value as Number", async () => {
    const field = numberField();

    const { result: props } = renderHook(() => useNumberFieldProps(field));
    render(<input {...props.current} />);

    await userEvent.type(screen.getByRole("spinbutton"), "9");

    expect(props.current.value).toBe(9);
  });
});
