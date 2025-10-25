import { render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { useCheckboxFieldProps } from "./useCheckboxFieldProps";
import { booleanField, checkboxField } from "../../fields";

describe("useCheckboxFieldProps()", () => {
  it("gives checkbox input props", () => {
    const field = checkboxField();
    const { result } = renderHook(() => useCheckboxFieldProps(field));

    expect(result.current.type).toBe("checkbox");
  });

  describe("with booleanField()", () => {
    it("initial value prop is false", () => {
      const field = booleanField();

      const checkboxProps = renderHook(() => useCheckboxFieldProps(field));

      expect(checkboxProps.result.current.checked).toBe(false);
    });
  });

  it("it reads the checked event property", async () => {
    const field = checkboxField();

    const checkboxProps = renderHook(() => useCheckboxFieldProps(field));

    render(
      <input data-testid="input-checkbox" {...checkboxProps.result.current} />,
    );

    expect(checkboxProps.result.current.checked).toBe(false);

    await userEvent.click(screen.getByTestId("input-checkbox"));

    expect(checkboxProps.result.current.checked).toBe(true);
  });

  it("can be initialized", async () => {
    const field = checkboxField();

    const checkboxProps = renderHook(() =>
      useCheckboxFieldProps(field, { initialValue: true }),
    );

    expect(checkboxProps.result.current.checked).toBe(true);
  });
});
