import { fireEvent, render, screen } from "@testing-library/react";
import { act as domAct, renderHook } from "@testing-library/react-hooks/dom";
import userEvent from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";

describe("<Field />", () => {
  it("focuses input when clicked on label", async () => {
    // const field = field();

    // render(<Field field={field} label="label" />);

    // render
    await userEvent.click(screen.getByLabelText("label", { exact: false }));

    expect(screen.getByRole("spinbutton")).toHaveFocus();
  });

  describe("with required field", () => {
    it("renders error message when submitting empty", async () => {
      const form = formAtom({
        /* add field */
      });
      const { result } = renderHook(() => useFormSubmit(form));

      // render

      const onSubmit = vi.fn();
      await domAct(async () => {
        result.current(onSubmit)();
      });

      expect(screen.getByRole("spinbutton")).toBeInvalid();
      expect(screen.getByText("This field is required")).toBeInTheDocument();
      expect(onSubmit).not.toBeCalled();
    });

    it("submits without error when valid", async () => {
      const form = formAtom({
        /* add field */
      });
      const { result } = renderHook(() => useFormSubmit(form));

      // render
      const input = screen.getByRole("TODO");

      // value must be string! https://github.com/capricorn86/happy-dom/issues/729
      await fireEvent.change(input, { target: { value: "0" } });

      expect(input).toBeValid();

      const onSubmit = vi.fn();
      await domAct(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ price: 0 });
    });
  });

  describe("with optional field", () => {
    it("submits with undefined", async () => {
      // const message = textField({ optional: true });
      const form = formAtom({
        /** message */
      });
      const { result } = renderHook(() => useFormSubmit(form));

      // render(<TextareaField field={message} />);

      const textarea = screen.getByRole("textbox");

      expect(textarea).toBeValid();

      const onSubmit = vi.fn();
      await domAct(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ message: undefined });
    });
  });
});
