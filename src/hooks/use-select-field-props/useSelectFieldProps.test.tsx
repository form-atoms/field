import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { EMPTY_VALUE, useSelectFieldProps } from "./useSelectFieldProps";
import { stringField } from "../../fields";

describe("useSelectFieldProps", () => {
  const props = {
    options: ["alfa", "bravo", "charlie"],
    getValue: (val: string) => val,
  };

  describe("initial value", () => {
    it("is -1 when field is empty", () => {
      const { result } = renderHook(() =>
        useSelectFieldProps({ field: stringField(), ...props })
      );

      expect(result.current.value).toBe(-1);
    });

    it("is option index of current field value", () => {
      const { result } = renderHook(() =>
        useSelectFieldProps({
          field: stringField({ value: "bravo" }),
          ...props,
        })
      );

      expect(result.current.value).toBe(1);
    });
  });

  describe("with option value out of bounds", () => {
    const field = stringField();

    const DummySelect = () => {
      const props = useSelectFieldProps({
        field,
        options: [],
        getValue: () => "",
      });

      return (
        <select {...props}>
          <option value={EMPTY_VALUE}>placeholder</option>
          <option value="9999">custom</option>
        </select>
      );
    };

    it("should reset to empty value", async () => {
      render(<DummySelect />);

      await userEvent.selectOptions(screen.getByRole("combobox"), [
        screen.getByText("custom"),
      ]);

      expect(screen.getByRole("combobox")).toHaveValue("-1");
    });
  });
});
