import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { useSelectFieldProps } from "./useSelectFieldProps";
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
});
