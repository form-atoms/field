import { textField } from "@form-atoms/field";
import { fireEvent, render, screen } from "@testing-library/react";
import { act as domAct, renderHook } from "@testing-library/react-hooks/dom";
import userEvent from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";

import { TextareaField } from ".";

describe("<TextareaField />", () => {
  // Error: Element TEXTAREA does not implement "select".
  it.skip("should focus input when clicked on label", async () => {
    const bio = textField();
    render(<TextareaField field={bio} label="biography" />);

    await userEvent.click(screen.getByLabelText("biography"));

    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  describe("with required textField()", () => {
    it("renders error message when submitting empty", async () => {
      const bio = textField();
      const form = formAtom({ bio });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<TextareaField field={bio} label="bio" />);

      const onSubmit = vi.fn();
      await domAct(async () => {
        result.current(onSubmit)();
      });

      expect(screen.getByRole("textbox")).toBeInvalid();
      expect(screen.getByText("This field is required")).toBeInTheDocument();
      expect(onSubmit).not.toBeCalled();
    });

    it("submits form without error  when entered valid numeric value", async () => {
      const cowsay = textField();
      const form = formAtom({ cowsay });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<TextareaField field={cowsay} />);

      const textarea = screen.getByRole("textbox");

      await fireEvent.change(textarea, { target: { value: "memento mori" } });

      expect(textarea).toBeValid();

      const onSubmit = vi.fn();
      await domAct(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ cowsay: "memento mori" });
    });
  });

  describe("with optional textField()", () => {
    it("submits form with undefined empty value", async () => {
      const message = textField({ optional: true });
      const form = formAtom({ message });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<TextareaField field={message} />);

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
