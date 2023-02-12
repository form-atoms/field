import { checkboxField } from "@form-atoms/field";
import { render, screen } from "@testing-library/react";
import { act as domAct, renderHook } from "@testing-library/react-hooks/dom";
import userEvent from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";

import { CheckboxField } from ".";

describe("<CheckboxField />", () => {
  it("should be checked when initial value is true", async () => {
    const tos = checkboxField({ value: true });

    render(<CheckboxField field={tos} label="terms" />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveAttribute("aria-invalid", "false");
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(checkbox).toBeChecked();
  });

  it("should focus input when clicked on label", async () => {
    const tos = checkboxField({});

    render(<CheckboxField field={tos} label="terms" />);

    const checkbox = screen.getByRole("checkbox");

    await userEvent.click(checkbox);

    // TODO: clicking does not fire change event somehow
    // expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(checkbox).toHaveFocus();
  });

  it("should render error message when submitting unchecked & required checkbox", async () => {
    const tos = checkboxField();
    const form = formAtom({ tos });
    const { result } = renderHook(() => useFormSubmit(form));

    render(<CheckboxField field={tos} label="terms" />);

    const handleSubmit = vi.fn();
    await domAct(async () => {
      result.current(handleSubmit)();
    });

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInvalid();
    expect(checkbox).not.toBeChecked();
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(handleSubmit).not.toBeCalled();
  });

  it("should submit when checked & required", async () => {
    const tos = checkboxField({ value: true });
    const form = formAtom({ tos });
    const { result } = renderHook(() => useFormSubmit(form));

    render(<CheckboxField field={tos} label="terms" />);

    const handleSubmit = vi.fn();
    await domAct(async () => {
      result.current(handleSubmit)();
    });

    expect(handleSubmit).toHaveBeenCalledWith({ tos: true });
  });
});
