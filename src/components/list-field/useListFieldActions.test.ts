import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useListFieldActions } from "./useListFieldActions";
import { formAtom, useFormSubmit } from "form-atoms";
import { numberField } from "../../fields";

describe("useListFieldActions()", () => {
  describe("adding item to the list", () => {
    it("appends the new item to the end of the list", async () => {
      const form = formAtom({
        luckyNumbers: [numberField({ value: 6 })],
      });

      const builder = () => numberField({ value: 9 });

      const { result: listFieldAction } = renderHook(() =>
        useListFieldActions(
          form,
          builder,
          ["luckyNumbers"],
          (field) => `${field}`
        )
      );

      const { result: formSubmit } = renderHook(() => useFormSubmit(form));

      await act(() => listFieldAction.current.add());
      await act(() => listFieldAction.current.add());

      const onSubmit = vi.fn();
      await act(() => formSubmit.current(onSubmit)());

      expect(onSubmit).toHaveBeenCalledWith({ luckyNumbers: [6, 9, 9] });
    });

    it("adds the item before a field when specified", async () => {
      const form = formAtom({
        luckyNumbers: [numberField({ value: 6 })],
      });

      const builder = () => numberField({ value: 9 });

      const { result: listFieldAction } = renderHook(() =>
        useListFieldActions(
          form,
          builder,
          ["luckyNumbers"],
          (field) => `${field}`
        )
      );

      const { result: formSubmit } = renderHook(() => useFormSubmit(form));

      await act(() =>
        // @ts-ignore
        listFieldAction.current.add(listFieldAction.current.items[0]?.atom)
      );

      const onSubmit = vi.fn();
      await act(() => formSubmit.current(onSubmit)());

      expect(onSubmit).toHaveBeenCalledWith({ luckyNumbers: [9, 6] });
    });
  });

  describe("removing item from the list", () => {
    it("submits without the removed item", async () => {
      const form = formAtom({
        luckyNumbers: [numberField({ value: 6 })],
      });

      const builder = () => numberField();

      const { result: listFieldAction } = renderHook(() =>
        useListFieldActions(
          form,
          builder,
          ["luckyNumbers"],
          (field) => `${field}`
        )
      );

      const { result: formSubmit } = renderHook(() => useFormSubmit(form));

      await act(() => listFieldAction.current.items[0]?.remove());

      const onSubmit = vi.fn();
      await act(() => formSubmit.current(onSubmit)());

      expect(onSubmit).toHaveBeenCalledWith({ luckyNumbers: [] });
    });
  });
});
