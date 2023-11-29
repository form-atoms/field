import { act, render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { dateField } from "./dateField";
import { getDateString } from "./DateInput.mock";
import { useDateFieldProps } from "./useDateFieldProps";

describe("useDateFieldProps", () => {
  it("reads empty value as undefined", async () => {
    const field = dateField({ value: new Date() });
    const { result } = renderHook(() => useDateFieldProps(field));

    render(
      <input
        type="date"
        data-testid="date"
        {...result.current}
        value={`${
          result.current.value ? getDateString(result.current.value) : ""
        }`}
      />,
    );

    expect(result.current.value).toBeInstanceOf(Date);

    const input = screen.getByTestId("date");

    await act(() => userEvent.clear(input));

    expect(result.current.value).toBe(undefined);
  });

  it("reads value as Date instance", async () => {
    const field = dateField();
    const { result } = renderHook(() => useDateFieldProps(field));

    render(
      <input
        type="date"
        data-testid="date"
        {...result.current}
        value={`${
          result.current.value ? getDateString(result.current.value) : ""
        }`}
      />,
    );

    const input = screen.getByTestId("date");

    await act(() => userEvent.type(input, getDateString()));

    expect(result.current.value).toBeInstanceOf(Date);
  });
});
