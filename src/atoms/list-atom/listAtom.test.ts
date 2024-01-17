import { act, renderHook } from "@testing-library/react";
import {
  formAtom,
  useFieldActions,
  useFieldErrors,
  useFieldState,
  useFieldValue,
  useFormActions,
  useFormSubmit,
} from "form-atoms";
import { useAtomValue } from "jotai";
import { describe, expect, it, test, vi } from "vitest";

import { listAtom } from "./listAtom";
import { numberField, textField } from "../../fields";
import { useFieldError, useListActions } from "../../hooks";

describe("listAtom()", () => {
  test("can be submitted within formAtom", async () => {
    const nums = listAtom({
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
      const list = listAtom({
        value: [],
        builder: ({ age }) => ({ age: numberField({ value: age }) }),
      });

      const { result } = renderHook(() =>
        useAtomValue(useAtomValue(list).empty),
      );

      expect(result.current).toBe(true);
    });

    it("is false when value contain data", () => {
      const list = listAtom({
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
    const list = listAtom({
      value: [{ age: 80 }, { age: 70 }],
      builder: ({ age }) => ({ age: numberField({ value: age }) }),
    });

    const result = renderHook(() => useFieldValue(list));

    expect(result.result.current).toEqual([{ age: 80 }, { age: 70 }]);
  });

  test("useFieldValue() reads list of primitive value", () => {
    const list = listAtom({
      value: [10, 20, 30],
      builder: (age) => numberField({ value: age }),
    });

    const result = renderHook(() => useFieldValue(list));

    expect(result.result.current).toEqual([10, 20, 30]);
  });

  describe("resetting form", () => {
    test("the formActions.reset resets the field value", async () => {
      const ages = listAtom({
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

    test("the formActions.reset resets the field error", async () => {
      const ages = listAtom({
        value: [],
        builder: (age) => numberField({ value: age }),
        validate: () => ["err"],
      });
      const form = formAtom({ ages });

      const { result: formActions } = renderHook(() => useFormActions(form));
      const { result: fieldError } = renderHook(() => useFieldError(ages));

      const onSubmit = vi.fn();
      await act(async () => formActions.current.submit(onSubmit)());

      expect(fieldError.current.error).not.toBe(undefined);

      await act(async () => formActions.current.reset());

      expect(fieldError.current.error).toBe(undefined);
    });
  });

  describe("validation", () => {
    it("adding item clear the error", async () => {
      const field = listAtom({
        value: [],
        builder: (value) => numberField({ value }),
        validate: ({ value }) => {
          const errors = [];
          if (value.length === 0) {
            errors.push("Can't be empty");
          }
          return errors;
        },
      });

      const { result: actions } = renderHook(() => useFieldActions(field));
      const { result: errors } = renderHook(() => useFieldErrors(field));

      await act(async () => actions.current.validate());

      expect(errors.current).toEqual(["Can't be empty"]);

      const { result: listActions } = renderHook(() => useListActions(field));

      await act(async () => listActions.current.add());

      expect(errors.current).toEqual([]);
    });

    it("validates the inner form items", async () => {
      const field = listAtom({
        value: [undefined],
        invalidItemError: "err",
        builder: (value) => numberField({ value }),
      });

      const { result: actions } = renderHook(() => useFieldActions(field));
      const { result: errors } = renderHook(() => useFieldErrors(field));

      await act(async () => actions.current.validate());

      expect(errors.current).toEqual(["err"]);
    });
  });

  describe("nested validation", () => {
    it("can't be submitted with invalid item's field", async () => {
      const field = listAtom({
        value: [undefined], // empty value for number
        builder: (value) => numberField({ value }),
      });

      const form = formAtom({ field });

      const { result: submit } = renderHook(() => useFormSubmit(form));
      const onSubmit = vi.fn();
      await act(async () => submit.current(onSubmit)());

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it("can't be submitted when item of nested list is invalid", async () => {
      const field = listAtom({
        name: "users",
        value: [{ accounts: [undefined] }],
        builder: ({ accounts }) => ({
          accounts: listAtom({
            name: "bank-accounts",
            value: accounts,
            builder: (iban) => textField({ name: "iban", value: iban }),
          }),
        }),
      });

      const form = formAtom({ field });

      const { result: submit } = renderHook(() => useFormSubmit(form));
      const onSubmit = vi.fn();
      await act(async () => submit.current(onSubmit)());

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it("has the invalidItemError, when item of nested list is invalid", async () => {
      const field = listAtom({
        invalidItemError: "There are some errors",
        value: [undefined], // empty value for a required number will cause error
        builder: (value) => numberField({ value }),
      });

      const form = formAtom({ field });

      const { result: submit } = renderHook(() => useFormSubmit(form));
      const { result: fieldError } = renderHook(() => useFieldError(field));

      await act(async () => submit.current(vi.fn())());

      expect(fieldError.current.error).toBe("There are some errors");
    });

    it("should lose invalidItemError, when the nested item error is fixed", async () => {
      const field = listAtom({
        value: [undefined], // empty value for a required number will cause error
        builder: (value) => numberField({ value }),
      });

      const form = formAtom({ field });

      const { result: submit } = renderHook(() => useFormSubmit(form));
      const { result: fieldError } = renderHook(() => useFieldError(field));
      const { result: formFields } = renderHook(() =>
        useAtomValue(useAtomValue(field)._formFields),
      );

      const { result: inputActions } = renderHook(() =>
        useFieldActions(formFields.current[0]!),
      );

      expect(fieldError.current.error).toBe(undefined);

      await act(async () => submit.current(vi.fn())());

      expect(fieldError.current.error).toBe("Some list items contain errors.");

      await act(async () => inputActions.current.setValue(5));

      expect(fieldError.current.error).toBe(undefined);
    });
  });

  describe("dirty", () => {
    it("becomes dirty when an item is removed", async () => {
      const field = listAtom({
        value: [42],
        builder: (value) => numberField({ value }),
      });

      const { result: state } = renderHook(() => useFieldState(field));
      const { result: listActions } = renderHook(() => useListActions(field));
      const { result: list } = renderHook(() =>
        useAtomValue(useAtomValue(field)._splitList),
      );
      expect(state.current.dirty).toBe(false);

      await act(async () => listActions.current.remove(list.current[0]!));

      expect(state.current.dirty).toBe(true);
    });

    it("becomes dirty when an item is added ", async () => {
      const field = listAtom({
        value: [],
        builder: (value) => numberField({ value }),
      });

      const { result: state } = renderHook(() => useFieldState(field));
      const { result: listActions } = renderHook(() => useListActions(field));

      expect(state.current.dirty).toBe(false);

      await act(async () => listActions.current.add());

      expect(state.current.dirty).toBe(true);
    });

    it("becomes dirty when items are reordered", async () => {
      const field = listAtom({
        value: [42, 84],
        builder: (value) => numberField({ value }),
      });

      const { result: state } = renderHook(() => useFieldState(field));
      const { result: listActions } = renderHook(() => useListActions(field));
      const { result: list } = renderHook(() =>
        useAtomValue(useAtomValue(field)._splitList),
      );
      expect(state.current.dirty).toBe(false);

      await act(async () => listActions.current.move(list.current[0]!));

      expect(state.current.dirty).toBe(true);
    });

    it("becomes pristine when items are reordered & back", async () => {
      const field = listAtom({
        value: [42, 84],
        builder: (value) => numberField({ value }),
      });

      const { result: state } = renderHook(() => useFieldState(field));
      const { result: listActions } = renderHook(() => useListActions(field));
      const { result: list } = renderHook(() =>
        useAtomValue(useAtomValue(field)._splitList),
      );
      expect(state.current.dirty).toBe(false);

      // moves first item down
      await act(async () => listActions.current.move(list.current[0]!));

      expect(state.current.dirty).toBe(true);

      // moves first item down
      await act(async () => listActions.current.move(list.current[0]!));

      expect(state.current.dirty).toBe(false);
    });

    it("becomes pristine after value is set (the set is usually called by useFieldInitialValue to hydrate the field)", async () => {
      const field = listAtom({
        value: [] as number[],
        builder: (value) => numberField({ value }),
      });

      const { result: state } = renderHook(() => useFieldState(field));
      const { result: fieldActions } = renderHook(() => useFieldActions(field));

      expect(state.current.dirty).toBe(false);

      await act(async () => fieldActions.current.setValue([42]));

      expect(state.current.dirty).toBe(false);
    });

    it("becomes dirty when some item field is edited", async () => {
      const field = listAtom({
        value: [undefined],
        builder: (value) => numberField({ value }),
      });

      const { result: fieldState } = renderHook(() => useFieldState(field));
      const { result: formFields } = renderHook(() =>
        useAtomValue(useAtomValue(field)._formFields),
      );
      const { result: inputActions } = renderHook(() =>
        useFieldActions(formFields.current[0]!),
      );

      expect(fieldState.current.dirty).toBe(false);

      await act(async () => inputActions.current.setValue(42));

      expect(fieldState.current.dirty).toBe(true);

      await act(async () => inputActions.current.reset());

      expect(fieldState.current.dirty).toBe(false);
    });
  });
});
