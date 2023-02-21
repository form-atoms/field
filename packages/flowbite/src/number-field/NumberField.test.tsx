import { numberField } from "@form-atoms/field";
import { fireEvent, render, screen } from "@testing-library/react";
import { act as domAct, renderHook } from "@testing-library/react-hooks/dom";
import userEvent from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";

import { NumberField } from ".";

describe("<NumberField />", () => {
  it("focuses input when clicked on label", async () => {
    const amount = numberField();

    render(<NumberField field={amount} label="amount" />);

    await userEvent.click(screen.getByLabelText("amount", { exact: false }));

    expect(screen.getByRole("spinbutton")).toHaveFocus();
  });

  describe("with required numberField", () => {
    it("renders error message when submitting empty", async () => {
      const price = numberField();
      const form = formAtom({ price });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<NumberField field={price} label="price" />);

      const onSubmit = vi.fn();
      await domAct(async () => {
        result.current(onSubmit)();
      });

      expect(screen.getByRole("spinbutton")).toBeInvalid();
      expect(screen.getByText("This field is required")).toBeInTheDocument();
      expect(onSubmit).not.toBeCalled();
    });

    it("submits form without error  when entered valid numeric value", async () => {
      const price = numberField();
      const form = formAtom({ price });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<NumberField field={price} />);

      const onSubmit = vi.fn();
      await domAct(async () => {
        result.current(onSubmit)();
      });

      const input = screen.getByRole("spinbutton");
      expect(input).toBeInvalid();
      expect(screen.getByText("This field is required")).toBeInTheDocument();

      await fireEvent.change(input, { target: { value: 0 } });

      expect(input).toBeValid();

      await domAct(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ price: 0 });
    });
  });

  describe("with optional numberField()", () => {
    it("submits form with undefined empty value", async () => {
      const value = numberField({ optional: true });
      const form = formAtom({ value });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<NumberField field={value} />);

      const input = screen.getByRole("spinbutton");

      expect(input).toBeValid();

      const onSubmit = vi.fn();
      await domAct(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ value: undefined });
    });
  });
});
