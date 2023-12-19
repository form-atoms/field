import { act, renderHook } from "@testing-library/react";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { useListField } from "./useListField";
import { listField, numberField } from "../../fields";

describe("useListField()", () => {
  describe("adding item to the list", () => {
    it("appends the new item to the end of the list", async () => {
      const fields = {
        luckyNumbers: listField({
          name: "luckyNumbers",
          value: [6],
          builder: (value = 9) => numberField({ value }),
        }),
      };

      const form = formAtom(fields);

      const { result: list } = renderHook(() =>
        useListField(fields.luckyNumbers),
      );

      const { result: formSubmit } = renderHook(() => useFormSubmit(form));

      await act(() => list.current.add());
      await act(() => list.current.add());

      const onSubmit = vi.fn();
      await act(() => formSubmit.current(onSubmit)());

      expect(onSubmit).toHaveBeenCalledWith({ luckyNumbers: [6, 9, 9] });
    });

    it("adds the item before a field when specified", async () => {
      const fields = {
        luckyNumbers: listField({
          name: "luckyNumbers",
          value: [6],
          builder: (value = 9) => numberField({ value }),
        }),
      };
      const form = formAtom(fields);

      const { result: list } = renderHook(() =>
        useListField(fields.luckyNumbers),
      );

      const { result: formSubmit } = renderHook(() => useFormSubmit(form));

      await act(() => list.current.add(list.current.items[0]?.atom));

      const onSubmit = vi.fn();
      await act(() => formSubmit.current(onSubmit)());

      expect(onSubmit).toHaveBeenCalledWith({ luckyNumbers: [9, 6] });
    });
  });

  describe("removing last item from the list", () => {
    it("form becomes empty & submits empty array", async () => {
      const fields = {
        luckyNumbers: listField({
          name: "luckyNumbers",
          value: [6],
          builder: (value) => numberField({ value }),
        }),
      };
      const form = formAtom(fields);

      const { result: list } = renderHook(() =>
        useListField(fields.luckyNumbers),
      );

      const { result: formSubmit } = renderHook(() => useFormSubmit(form));

      await act(() => list.current.items[0]?.remove());

      const onSubmit = vi.fn();
      await act(() => formSubmit.current(onSubmit)());

      expect(onSubmit).toHaveBeenCalledWith({ luckyNumbers: [] });
      expect(list.current.isEmpty).toBe(true);
    });
  });

  describe("moving items", () => {
    it("moves item before previous when moveUp is called", async () => {
      const fields = {
        luckyNumbers: listField({
          name: "luckyNumbers",
          value: [6, 9],
          builder: (value) => numberField({ value }),
        }),
      };
      const form = formAtom(fields);

      const { result: list } = renderHook(() =>
        useListField(fields.luckyNumbers),
      );

      const { result: formSubmit } = renderHook(() => useFormSubmit(form));

      await act(() => list.current.items[1]?.moveUp());

      const onSubmit = vi.fn();
      await act(() => formSubmit.current(onSubmit)());

      expect(onSubmit).toHaveBeenCalledWith({ luckyNumbers: [9, 6] });
    });

    it("moves item after previous when moveDown is called", async () => {
      const fields = {
        luckyNumbers: listField({
          name: "luckyNumbers",
          value: [6, 9],
          builder: (value) => numberField({ value }),
        }),
      };
      const form = formAtom(fields);

      const { result: list } = renderHook(() =>
        useListField(fields.luckyNumbers),
      );

      const { result: formSubmit } = renderHook(() => useFormSubmit(form));

      await act(() => list.current.items[0]?.moveDown());

      const onSubmit = vi.fn();
      await act(() => formSubmit.current(onSubmit)());

      expect(onSubmit).toHaveBeenCalledWith({ luckyNumbers: [9, 6] });
    });
  });
});