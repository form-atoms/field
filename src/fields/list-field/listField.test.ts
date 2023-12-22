import { act, renderHook } from "@testing-library/react";
import {
  formAtom,
  useFieldActions,
  useFieldValue,
  useFormActions,
  useFormSubmit,
} from "form-atoms";
import { useAtomValue } from "jotai";
import { describe, expect, it, test, vi } from "vitest";

import { listField } from "./listField";
import { useFieldError } from "../../hooks";
import { numberField } from "../number-field";

describe("listField()", () => {
  describe("when required (default)", () => {
    it("can't be submitted with empty value", async () => {
      const list = listField({
        value: [],
        builder: (age) => numberField({ value: age }),
      });

      const form = formAtom({ list });

      const { result: submit } = renderHook(() => useFormSubmit(form));
      const onSubmit = vi.fn();
      await act(async () => submit.current(onSubmit)());

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it.only("has thedefault error  when submitted empty", async () => {
      const list = listField({
        value: [],
        builder: (age) => numberField({ value: age }),
      });

      const form = formAtom({ list });

      const { result: submit } = renderHook(() => useFormSubmit(form));
      const onSubmit = vi.fn();
      await act(async () => submit.current(onSubmit)());

      const { result } = renderHook(() => useFieldError(list));

      expect(result.current.error).toBe("This field is required");
    });
  });

  describe("when optional", () => {
    it("can submit with empty value", async () => {
      const list = listField({
        value: [],
        builder: (age) => numberField({ value: age }),
      }).optional();

      const form = formAtom({ list });

      const { result: submit } = renderHook(() => useFormSubmit(form));
      const onSubmit = vi.fn();
      await act(async () => submit.current(onSubmit)());

      expect(onSubmit).toHaveBeenCalled();
    });

    it("returns the same field when calling optional", () => {
      const list = listField({
        value: [],
        builder: (age) => numberField({ value: age }),
      }).optional();

      const listRef = list.optional().optional();

      expect(listRef).toEqual(list);
    });
  });

  test("can be submitted within formAtom", async () => {
    const nums = listField({
      value: [10, 20],
      builder: (value) => numberField({ value }),
    });

    const form = formAtom({ nums });

    const { result: submit } = renderHook(() => useFormSubmit(form));

    const onSubmit = vi.fn();

    await act(async () => submit.current(onSubmit)());

    expect(onSubmit).toHaveBeenCalledWith({ nums: [10, 20] });
  });

  describe("empty atom", () => {
    it("is true when values is empty array", () => {
      const list = listField({
        value: [],
        builder: ({ age }) => ({ age: numberField({ value: age }) }),
      });

      const { result } = renderHook(() =>
        useAtomValue(useAtomValue(list).empty),
      );

      expect(result.current).toBe(true);
    });

    it("is false when value contain data", () => {
      const list = listField({
        value: [{ age: 3 }],
        builder: ({ age }) => ({ age: numberField({ value: age }) }),
      });

      const { result } = renderHook(() =>
        useAtomValue(useAtomValue(list).empty),
      );

      expect(result.current).toBe(false);
    });
  });

  test("useFieldValue() reads list of object value", () => {
    const list = listField({
      value: [{ age: 80 }, { age: 70 }],
      builder: ({ age }) => ({ age: numberField({ value: age }) }),
    });

    const result = renderHook(() => useFieldValue(list));

    expect(result.result.current).toEqual([{ age: 80 }, { age: 70 }]);
  });

  test("useFieldValue() reads list of primitive value", () => {
    const list = listField({
      value: [10, 20, 30],
      builder: (age) => numberField({ value: age }),
    });

    const result = renderHook(() => useFieldValue(list));

    expect(result.result.current).toEqual([10, 20, 30]);
  });

  describe("resetting value", () => {
    test("the formResetAction resets value", async () => {
      const ages = listField({
        value: [10],
        builder: (age) => numberField({ value: age }),
      });
      const form = formAtom({ ages });

      const { result: formActions } = renderHook(() => useFormActions(form));
      const { result: fieldActions } = renderHook(() => useFieldActions(ages));

      await act(async () => fieldActions.current.setValue([30]));
      const onSubmit = vi.fn();
      await act(async () => formActions.current.submit(onSubmit)());
      expect(onSubmit).toHaveBeenCalledWith({ ages: [30] });

      await act(async () => formActions.current.reset());

      const reset_onSubmit = vi.fn();
      await act(async () => formActions.current.submit(reset_onSubmit)());
      expect(reset_onSubmit).toHaveBeenCalledWith({ ages: [10] });
    });
  });
});
