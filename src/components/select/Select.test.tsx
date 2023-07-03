import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formAtom, useFormActions, useFormSubmit } from "form-atoms";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { booleanField, numberField, stringField, zodField } from "../../fields";
import { EMPTY_SELECT_VALUE } from "../../hooks";

import { Select } from ".";

describe("<Select />", () => {
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
      render(<Select {...props} />);

      await act(() =>
        userEvent.selectOptions(screen.getByRole("combobox"), [
          screen.getByText("no"),
        ])
      );

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ field: false });
    });

    it("should use the placeholder prop", () => {
      render(<Select {...props} placeholder="Do you agree?" />);

      expect(screen.getByText("Do you agree?")).toBeInTheDocument();
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
      render(<Select {...props} />);

      await act(() =>
        userEvent.selectOptions(screen.getByRole("combobox"), [
          screen.getByText("1971"),
        ])
      );

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
      render(<Select {...props} />);

      await act(() =>
        userEvent.selectOptions(screen.getByRole("combobox"), [
          screen.getByText("some"),
        ])
      );

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ field: "some" });
    });
  });

  it("clears value when the form is reset", async () => {
    const props = {
      field: booleanField(),
      options: [true, false],
      getLabel: (bool: boolean) => (bool ? "yes" : "no"),
      getValue: (bool: boolean) => bool,
    };

    const form = formAtom({ field: props.field });
    const { result } = renderHook(() => useFormActions(form));
    render(<Select {...props} />);

    await act(() =>
      userEvent.selectOptions(screen.getByRole("combobox"), [
        screen.getByText("yes"),
      ])
    );

    await act(async () => {
      result.current.reset();
    });

    expect(screen.getByRole("combobox")).toHaveValue(`${EMPTY_SELECT_VALUE}`);

    const onSubmit = vi.fn();
    await act(async () => {
      result.current.submit(onSubmit)();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("initializes properly when field has custom shape", async () => {
    const options = [
      { username: "foo", id: "1" },
      { username: "boo", id: "2" },
    ];

    const schema = z.object({ id: z.string(), username: z.string() });

    type User = (typeof schema)["_output"];

    const props = {
      field: zodField({
        // NOTE: must be referenced from options, as <Select /> does not do deep equal to get option index!
        value: options[1],
        schema,
      }),
      options,
      getLabel: (user: User) => `${user.username} ${user.id}`,
      getValue: (user: User) => user,
    };

    const form = formAtom({ field: props.field });
    const { result } = renderHook(() => useFormActions(form));
    render(<Select {...props} />);

    await act(() =>
      userEvent.selectOptions(screen.getByRole("combobox"), [
        screen.getByText("boo 2"),
      ])
    );

    const onSubmit = vi.fn();
    await act(async () => {
      result.current.submit(onSubmit)();
    });

    expect(onSubmit).toHaveBeenCalledWith({ field: options[1] });
  });

  describe("with optional field", () => {
    it("can be cleared by selecting the placeholder option", async () => {
      const props = {
        field: stringField().optional(),
        options: ["male", "female"],
        getLabel: (val: string) => val,
        getValue: (val: string) => val,
      };

      const form = formAtom({ field: props.field });
      const { result } = renderHook(() => useFormSubmit(form));
      render(<Select {...props} placeholder="gender" />);

      await act(() =>
        userEvent.selectOptions(screen.getByRole("combobox"), [
          screen.getByText("male"),
        ])
      );

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ field: "male" });

      await act(() =>
        userEvent.selectOptions(screen.getByRole("combobox"), [
          screen.getByText("gender"),
        ])
      );

      const onSubmit2 = vi.fn();
      await act(async () => {
        result.current(onSubmit2)();
      });

      expect(onSubmit2).toHaveBeenCalledWith({ field: undefined });
    });
  });
});
