import { textField } from "@form-atoms/field";
import { render, screen } from "@testing-library/react";
import { act as domAct, renderHook } from "@testing-library/react-hooks/dom";
import userEvent from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";

import { TextField } from ".";

describe("<TextField />", () => {
  it("should focus input when clicked on label", async () => {
    const lastName = textField();

    render(<TextField field={lastName} label="last name" />);

    await userEvent.click(screen.getByLabelText("last name"));

    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  describe("with optional textField()", () => {
    it("submits with undefined", async () => {
      const message = textField({ optional: true });
      const form = formAtom({ message });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<TextField field={message} />);

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
