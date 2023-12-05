import { render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import { useCheckboxFieldProps } from "./useCheckboxFieldProps";
import { booleanField, checkboxField } from "../../fields";

describe("useCheckboxFieldProps()", () => {
  describe("with booleanField()", () => {
    test("initial value prop is false", () => {
      const field = booleanField();

      const checkboxProps = renderHook(() => useCheckboxFieldProps(field));

      expect(checkboxProps.result.current.checked).toBe(false);
    });
  });

  test("it reads the checked event property", async () => {
    const field = checkboxField();

    const checkboxProps = renderHook(() => useCheckboxFieldProps(field));

    render(
      <input
        type="checkbox"
        data-testid="input-checkbox"
        {...checkboxProps.result.current}
      />,
    );

    expect(checkboxProps.result.current.checked).toBe(false);

    await userEvent.click(screen.getByTestId("input-checkbox"));

    expect(checkboxProps.result.current.checked).toBe(true);
  });
});
