import { render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import { useCheckboxGroup } from "./useCheckboxGroup";
import { stringArrayField } from "../../fields";

describe("useCheckboxGroup()", () => {
  const options = ["electric", "gas", "manual"] as const;
  const getValue = (opt: string) => opt;

  test("initialize the field via options", () => {
    // NOTE: test got stuck when the options are inlined
    const fieldOptions = { initialValue: ["gas", "manual"] };

    const field = stringArrayField();

    const { result } = renderHook(() =>
      useCheckboxGroup(
        { field, options, getValue, getLabel: getValue },
        fieldOptions,
      ),
    );

    expect(result.current).toHaveLength(options.length);
    expect(result.current[0]).toHaveProperty("checked", false);
    expect(result.current[1]).toHaveProperty("checked", true);
    expect(result.current[2]).toHaveProperty("checked", true);
  });

  describe("with required field", () => {
    test("it has required checkboxes", () => {
      const field = stringArrayField();

      const { result } = renderHook(() =>
        useCheckboxGroup({ field, options, getValue, getLabel: getValue }),
      );

      for (const item of result.current) {
        expect(item).toHaveProperty("required", true);
        expect(item).toHaveProperty("type", "checkbox");
      }
    });

    test("has optional checkboxes when the field is not empty", () => {
      const field = stringArrayField({ value: [options[0]] });

      const { result } = renderHook(() =>
        useCheckboxGroup({ field, options, getValue, getLabel: getValue }),
      );

      for (const item of result.current) {
        expect(item).toHaveProperty("required", false);
      }
    });
  });

  test("the onChange toggles the option", async () => {
    const field = stringArrayField();

    const { result } = renderHook(() =>
      useCheckboxGroup({ field, options, getValue, getLabel: getValue }),
    );

    const { rerender } = render(
      <input {...result.current[0]} data-testid="input-checkbox" />,
    );

    expect(result.current[0]).toHaveProperty("checked", false);
    expect(result.current[1]).toHaveProperty("checked", false);

    // not sure exactly why the need to rerender
    await userEvent.click(screen.getByTestId("input-checkbox"));
    rerender(<input {...result.current[0]} data-testid="input-checkbox" />);

    expect(result.current[0]).toHaveProperty("checked", true);
    expect(result.current[1]).toHaveProperty("checked", false);

    await userEvent.click(screen.getByTestId("input-checkbox"));
    rerender(<input {...result.current[0]} data-testid="input-checkbox" />);

    expect(result.current[0]).toHaveProperty("checked", false);
    expect(result.current[1]).toHaveProperty("checked", false);
  });

  test("the active options are checked", () => {
    const field = stringArrayField({ value: [options[2], options[1]] });

    const { result } = renderHook(() =>
      useCheckboxGroup({ field, options, getValue, getLabel: getValue }),
    );

    expect(result.current).toHaveLength(options.length);
    expect(result.current[0]).toHaveProperty("checked", false);
    expect(result.current[1]).toHaveProperty("checked", true);
    expect(result.current[2]).toHaveProperty("checked", true);
  });
});
