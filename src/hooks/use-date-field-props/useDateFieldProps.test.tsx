import { render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { useDateFieldProps } from "./useDateFieldProps";
import { dateField } from "../../fields/date-field";
import { getDateString } from "../../fields/date-field/DateInput.mock";

describe("useDateFieldProps", () => {
  it("gives date input type", () => {
    const field = dateField();
    const { result } = renderHook(() => useDateFieldProps(field));

    expect(result.current.type).toBe("date");
  });

  it("initializes the field via options", () => {
    const field = dateField();
    const initialValue = new Date("2024/03/31");

    const { result: props } = renderHook(() =>
      useDateFieldProps(field, { initialValue }),
    );

    expect(props.current.value).toBe(initialValue);
  });

  it("reads empty value as undefined", async () => {
    const field = dateField({ value: new Date() });
    const { result } = renderHook(() => useDateFieldProps(field));

    render(
      <input
        data-testid="date"
        {...result.current}
        value={`${
          result.current.value ? getDateString(result.current.value) : ""
        }`}
      />,
    );

    expect(result.current.value).toBeInstanceOf(Date);

    const input = screen.getByTestId("date");

    await userEvent.clear(input);

    expect(result.current.value).toBe(undefined);
  });

  it("reads value as Date instance", async () => {
    const field = dateField();
    const { result } = renderHook(() => useDateFieldProps(field));

    render(
      <input
        data-testid="date"
        {...result.current}
        value={`${
          result.current.value ? getDateString(result.current.value) : ""
        }`}
      />,
    );

    const input = screen.getByTestId("date");

    await userEvent.type(input, getDateString());

    expect(result.current.value).toBeInstanceOf(Date);
  });
});
