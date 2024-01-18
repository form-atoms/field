import { act, render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it, vi } from "vitest";

import { booleanField, numberField, stringField } from "../../fields";

import { RadioGroup } from ".";

describe("<RadioGroup />", () => {
  describe("with booleanField", () => {
    const props = {
      field: booleanField(),
      options: [true, false],
      getLabel: (bool: boolean) => (bool ? "yes" : "no"),
      getValue: (bool: boolean) => bool,
    };

    it("submits with boolean value", async () => {
      const form = formAtom({ field: props.field });
      const { result } = renderHook(() => useFormSubmit(form));
      render(<RadioGroup {...props} />);

      await userEvent.click(screen.getByLabelText("yes"));
      expect(screen.getByLabelText("yes")).toBeChecked();

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ field: true });
    });
  });

  describe("with numberField", () => {
    const props = {
      field: numberField(),
      options: [1984, 1971, 1776],
      getLabel: (num: number) => num,
      getValue: (num: number) => num,
    };

    it("submits with number value", async () => {
      const form = formAtom({ field: props.field });
      const { result } = renderHook(() => useFormSubmit(form));
      render(<RadioGroup {...props} />);

      await userEvent.click(screen.getByText("1971"));
      expect(screen.getByLabelText("1971")).toBeChecked();

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ field: 1971 });
    });
  });

  describe("with stringField", () => {
    const props = {
      field: stringField(),
      options: ["some", "none", "all"],
      getLabel: (val: string) => val,
      getValue: (val: string) => val,
    };

    it("submits with string value", async () => {
      const form = formAtom({ field: props.field });
      const { result } = renderHook(() => useFormSubmit(form));
      render(<RadioGroup {...props} />);

      await userEvent.click(screen.getByText("some"));
      expect(screen.getByLabelText("some")).toBeChecked();

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ field: "some" });
    });
  });

  describe("initialValue prop", () => {
    it("sets the field value", async () => {
      const props = {
        field: stringField(),
        options: ["none", "some", "all"],
        getLabel: (val: string) => val,
        getValue: (val: string) => val,
      };
      const form = formAtom({ field: props.field });
      const { result } = renderHook(() => useFormSubmit(form));
      render(<RadioGroup {...props} initialValue="some" />);

      expect(screen.getByLabelText("some")).toBeChecked();

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ field: "some" });
    });
  });
});
